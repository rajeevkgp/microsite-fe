import { Select, Input, Checkbox, Button } from "antd";

import * as React from "react";

import {
  PlusCircleTwoTone,
  DeleteOutlined,
  CloseCircleFilled,
  CopyFilled,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const Test = () => {
  const { Option } = Select;

  // const [value, setValue] = React.useState("SmallText");
  const newQuestion = {
    questionText: "",
    questionType: "",
    Option: [{ optionText: "" }],
  };

  const [Survey, setSurvey] = React.useState({
    questions: [newQuestion],
  });

  const handleClick = (e: any) => {
    e.preventdefault();

    console.log(e);
  };

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  const handleAddOption = (i: number, j: number) => {
    console.log(i + " " + j);
    let t = Survey;
    t.questions[i].Option.splice(j + 1, 0, { optionText: "" });
    console.log(t);
    setSurvey({ ...t });
  };

  const handleOPtionIn = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    console.log(i + " " + j);
    let t = Survey;
    t.questions[i].Option.splice(j, 0, { optionText: e.target.value });
    t.questions[i].Option.splice(j + 1, 1);
    console.log(t);
    setSurvey({ ...t });
  };

  const handleDeleteOption = (i: number, j: number) => {
    let t = Survey;
    t.questions[i].Option.splice(j, 1);
    console.log(t);
    setSurvey({ ...t });
  };

  const radioUI = (i: number) => {
    return (
      <>
        <div className="form-check">
          {Survey.questions[i].Option.map((op, j) => (
            <>
              <div className="row">
                <div className="col-6">
                  <>
                    <input
                      key={j}
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                    />
                    <Input
                      placeholder="Enter option"
                      value={op.optionText}
                      onChange={(e) => handleOPtionIn(e, i, j)}
                    />
                  </>
                </div>
                <div className="col-6">
                  <PlusCircleTwoTone onClick={(e) => handleAddOption(i, j)} />{" "}
                  <CloseCircleFilled
                    style={{ color: "red" }}
                    onClick={(e) => handleDeleteOption(i, j)}
                  />
                </div>
              </div>
              <br />
            </>
          ))}
        </div>
      </>
    );
  };
  const handleSelect = (value: string, i: number) => {
    let a = Survey.questions[i];
    a = { ...a, questionType: value };
    const l = [
      ...Survey.questions.slice(0, i),
      a,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
  };

  const checkBoxUi = () => {
    return (
      <>
        <div className="row">
          <div className="col-6">
            <Checkbox onChange={changeCheck}>
              {" "}
              <Input placeholder="Enter option" />{" "}
            </Checkbox>
          </div>
          <div className="col-6">
            <span onClick={(_e) => console.log("hi")}>
              <PlusCircleTwoTone />{" "}
            </span>
            <span>
              <CloseCircleFilled style={{ color: "red" }} />
            </span>
          </div>
        </div>
      </>
    );
  };
  const changeCheck = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleSwitch = (v: string, i: number) => {
    switch (v) {
      case "radio":
        return radioUI(i);
      case "checkBox":
        return checkBoxUi();
      default:
        return <TextArea></TextArea>;
    }
  };
  const addQuestion = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const l = [...Survey.questions];
    l.push(newQuestion);
    setSurvey({ ...Survey, questions: l });
  };

  const handleQuestionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    //console.log(e.target.name);
    let a = Survey.questions[i];
    a = { ...a, questionText: e.target.value };
    const l = [
      ...Survey.questions.slice(0, i),
      a,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
    console.log(a.questionText);
  };
  const DeleteQuestion = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    i: number
  ) => {
    const l = [
      ...Survey.questions.slice(0, i),
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
    console.log(`Delete at ${i}`);
  };

  const dublicateQuestion = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    i: number
  ) => {
    let t = Survey;
    let q = t.questions[i];
    t.questions.splice(i + 1, 0, q);
    console.log(t);
    setSurvey({ ...t });
  };
  return (
    <div className="question_form">
      <br></br>
      <div className="section">
        <div className="question_title_section">
          <div className="question_form_top">
            <input
              type="text"
              //name="surveyTitle"
              className="question_form_top_name"
              style={{ color: "black" }}
              placeholder="unititled document"
            ></input>
            <input
              type="text"
              className="question_form_top_desc"
              style={{ color: "black" }}
              placeholder="Form description"
            ></input>
          </div>
        </div>
        <div className="container" style={{ paddingTop: "10px" }}>
          {Survey.questions.map((_q, _i) => (
            <>
              <form>
                <div
                  className="card "
                  //onSelect={}
                  style={{
                    borderLeft: "4px solid rgb(103, 58, 183)",
                  }}
                >
                  <div className="card-header">
                    <div className="row">
                      <div className="col-6">
                        <div className="input-group ">
                          <input
                            key={_i}
                            type="text"
                            className="form-control"
                            placeholder="Question"
                            aria-label="questionText"
                            name="questionText"
                            aria-describedby="basic-addon1"
                            value={_q.questionText}
                            onChange={(e) => handleQuestionText(e, _i)}
                          />
                        </div>
                      </div>

                      <div className="col-4">
                        <Select
                          defaultValue={_q.questionType}
                          onChange={(e) => handleSelect(e, _i)}
                        >
                          <Option value="radio">Radio</Option>

                          <Option value="checkBox">check Box</Option>

                          <Option value="TextArea">SmallText</Option>
                        </Select>
                      </div>

                      <div className="col-2">
                        <div style={{ position: "absolute", float: "right" }}>
                          <CopyFilled
                            onClick={(e) => dublicateQuestion(e, _i)}
                          />{" "}
                          <DeleteOutlined
                            style={{ color: "red" }}
                            onClick={(e) => DeleteQuestion(e, _i)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div>{handleSwitch(_q.questionType, _i)}</div>
                  </div>
                </div>
                <br />
              </form>
            </>
          ))}
          <Button type="primary" onClick={(e) => addQuestion(e)}>
            Add Question
          </Button>
        </div>
      </div>
      <div className="btn btn-sm btn-primary">Save Survey</div>
    </div>
  );
};

export default Test;