import { notification, Pagination, Card } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
  assignSurveyToUserId,
  deleteSurveyById,
  getAllSurveys,
  getImage,
} from "../../../../service/survey-service";
import type { PaginationProps } from "antd";
import Meta from "antd/lib/card/Meta";

interface surveyType {
  id: string;
  surveyTitle: string;
  description: string;
  imgUrl: string;
  questions: questionsType[];
}
interface questionsType {
  id: string;
  questionText: string;
  questionType: string;
  choice: Choice[];
}
interface Choice {
  choiceText: string;
}
function SurveyList() {
  type NotificationType = "success" | "info" | "warning" | "error";
  let navigate = useNavigate();
  const [pageNumber, setPageNumber] = React.useState(0);

  const [Surveys, setSurvey] = React.useState<surveyType[]>([
    {
      id: "",
      surveyTitle: "",
      description: "",
      imgUrl: "",
      questions: [
        {
          id: "",
          questionText: "",
          questionType: "",
          choice: [{ choiceText: "" }, { choiceText: "" }],
        },
      ],
    },
  ]);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: String
  ) => {
    notification[type]({
      message,
    });
  };
  const deleteSurvey = (id: string) => {
    if (confirm("Do you really want to delete Survey")) {
      deleteSurveyById(id)
        .then((res) => {
          openNotificationWithIcon("success", "successfuly deleted");
          getSurveys(1);
        })
        .catch((err) => {
          openNotificationWithIcon("error", err.data.message);
        });
    }
  };

  const getSurveys = (pageNumber: number) => {
    getAllSurveys(pageNumber)
      .then((res) => {
        setSurvey(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const assigneeSurvey = (id: string) => {
    let userId = prompt("Please Enter User Id", "22");
    if (userId != null) {
      assignSurveyToUserId(userId, id)
        .then((res) => {
          console.log("Response", res);
          openNotificationWithIcon("success", `Survey assigneed to ${userId}`);
        })
        .catch((err) => {
          // console.log("This is the error", err);
          openNotificationWithIcon("error", err.data.data.message);
        });
    }
  };

  React.useEffect(() => {
    getSurveys(pageNumber);
  }, [pageNumber]);

  const handlePagination = (pageNumber: any) => {
    getSurveys(pageNumber - 1);
  };
  return (
    <div>
      <div className="question_form">
        <div className="container">
          <div className="row">
            {Surveys.length === 0
              ? "No Surveys created"
              : Surveys.map((s) => (
                  <div className="col-lg-3" key={s.id}>
                    <Card
                      hoverable
                      style={{ width: 200, margin: "1em" }}
                      cover={
                        <img
                          alt="example"
                          src={"data:image/png;base64," + s.imgUrl}
                        />
                      }
                      actions={[
                        <DeleteOutlined
                          style={{ color: "red" }}
                          onClick={(e) => deleteSurvey(s.id)}
                        />,
                        <EditOutlined
                          key="edit"
                          onClick={(e) =>
                            navigate(`/survey/created-surveys/edit/${s.id}`)
                          }
                        />,
                        <EllipsisOutlined
                          key="ellipsis"
                          onClick={(e) => assigneeSurvey(s.id)}
                        />,
                      ]}
                    >
                      <Meta title={s.surveyTitle} />
                    </Card>
                    {/* <div className="card">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-8">{s.surveyTitle}</div>
                          <div className="col-4">
                            <div
                              style={{ position: "relative", float: "right" }}
                            >
                              <EditTwoTone
                                onClick={(e) =>
                                  navigate(
                                    `/survey/created-surveys/edit/${s.id}`
                                  )
                                }
                              />{" "}
                              <DeleteOutlined
                                style={{ color: "red" }}
                                onClick={(e) => deleteSurvey(s.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p>{s.description} </p>
                        <div style={{ position: "relative", float: "right" }}>
                          <InfoCircleFilled
                            onClick={(e) => assigneeSurvey(s.id)}
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={30}
        onChange={handlePagination}
      />
    </div>
  );
}

export default SurveyList;