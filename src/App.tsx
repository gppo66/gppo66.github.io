import { Button } from "@mui/material";
import { AdminTag, ButtonContainer } from "./components/Buttons.style";
import { Header } from "./components/header";
import {
  ColumnContainer,
  ContentContainer,
  RowContainer,
} from "./components/Content.style";
import { GInput } from "./components/input.style";
import { BlockHeader } from "./components/header.style";
import { useEffect, useState } from "react";
import { BillDetail, BillPerson } from "./models/bill";
import {
  CostBox,
  CostName,
  CostPerson,
  CostRow,
} from "./components/costList.style";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";

const App = () => {
  const [bumbai, setBumbai] = useState<BillPerson[]>([]);
  const [person, setPerson] = useState<string>("");
  const [costList, setCostList] = useState<BillDetail[]>([]);
  const [target, setTarget] = useState<string>("");
  const [money, setMoney] = useState<number>(0);

  useEffect(() => {
    var total: number = 0;
    total = costList.reduce((sum, acc) => {
      return Number(sum) + Number(acc.cost);
    }, 0);

    setBumbai(
      bumbai?.map((cost) => {
        return {
          ...cost,
          cost: bumbai.length !== 0 ? total / bumbai.length : total,
        };
      }),
    );
  }, [costList, bumbai]);

  useEffect(() => {
    const bumb = localStorage.getItem("bumbai");
    if (bumb !== null) {
      setBumbai(JSON.parse(bumb));
    }
    const colist = localStorage.getItem("cost");
    if (colist !== null) {
      setCostList(JSON.parse(colist));
    }
  }, []);
  return (
    <>
      <Header HeaderText="Hello World">
        <ButtonContainer>
          <Button variant="text" size="medium" onClick={save}>
            저장
          </Button>
          <Button variant="text" color="error" size="medium" onClick={reset}>
            초기화
          </Button>
        </ButtonContainer>
      </Header>
      <ContentContainer>
        <RowContainer style={{ marginBottom: "20px", padding: "20px 20px" }}>
          <GInput
            type="text"
            placeholder={"이름"}
            width={"150px"}
            value={person}
            onChange={(e: any) => setPerson(e.target.value)}
          />
          {bumbai?.length === 0 ? (
            <Button
              variant="contained"
              size="medium"
              sx={{ ml: "10px" }}
              onClick={addPerson}
            >
              총무
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="medium"
              sx={{ ml: "10px" }}
              onClick={addPerson}
            >
              추가
            </Button>
          )}
        </RowContainer>
        <RowContainer>
          <ColumnContainer
            width={"50%"}
            style={{ borderRight: "1px solid black" }}
          >
            <BlockHeader style={{ padding: "20px 20px" }}>
              <RowContainer>
                총액 :{" "}
                {Number(
                  costList.reduce((sum, acc) => {
                    return Number(sum) + Number(acc.cost);
                  }, 0),
                )}
                원
              </RowContainer>
              <CostRow>
                <GInput
                  type="text"
                  placeholder={"무엇을"}
                  width={"75px"}
                  value={target}
                  onChange={(e: any) => setTarget(e.target.value)}
                />
                <GInput
                  type="text"
                  placeholder={"얼마를"}
                  width={"75px"}
                  value={Number(money)}
                  onChange={(e: any) => {
                    const { value } = e.target;

                    const onlyNumberPersonValue = value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*)\./g, "$1");
                    setMoney(onlyNumberPersonValue);
                  }}
                  style={{ marginLeft: "10px" }}
                />
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ ml: "10px" }}
                  onClick={addCost}
                >
                  추가
                </Button>
              </CostRow>
            </BlockHeader>
            <CostBox
              style={{
                borderTop: costList?.length !== 0 ? "1px solid black" : "",
              }}
            >
              {costList?.map((cost: BillDetail) => {
                return (
                  <CostRow>
                    <CostPerson
                      style={{
                        justifyContent: "flex-end",
                      }}
                    >
                      <CostName>{cost.target}</CostName>
                    </CostPerson>
                    <CostPerson style={{ justifyContent: "flex-end" }}>
                      <CostName>{cost.cost}원</CostName>
                      <div id={cost?.target} onClick={deleteCost}>
                        <DeleteIcon />
                      </div>
                    </CostPerson>
                  </CostRow>
                );
              })}
            </CostBox>
          </ColumnContainer>
          <ColumnContainer width={"50%"}>
            <BlockHeader style={{ padding: "20px 20px" }}>
              1/N 영수증
            </BlockHeader>
            <CostBox
              style={{
                borderTop: bumbai?.length !== 0 ? "1px solid black" : "",
              }}
            >
              {bumbai?.map((cost: BillPerson) => {
                return (
                  <CostRow>
                    <CostPerson
                      style={{
                        justifyContent: "flex-end",
                      }}
                    >
                      <CostName>{(cost?.cost).toFixed(0)}원</CostName>
                    </CostPerson>
                    <CostPerson style={{ justifyContent: "space-between" }}>
                      <CostName>
                        {cost?.name}
                        {cost?.name === bumbai[0].name && " (총무) "}
                      </CostName>
                      <div id={cost?.name} onClick={deletePerson}>
                        <DeleteIcon />
                      </div>
                    </CostPerson>
                  </CostRow>
                );
              })}
            </CostBox>
          </ColumnContainer>
        </RowContainer>
      </ContentContainer>
    </>
  );

  function addPerson() {
    if (person.length === 0) {
      alert("이름값은 필수입니다.");
    } else {
      setBumbai([
        ...bumbai,
        {
          name: person,
          cost: 0,
        },
      ]);
      setPerson("");
    }
  }

  function deletePerson(e: React.MouseEvent<HTMLElement>) {
    setBumbai(
      bumbai.filter((cost: BillPerson) => cost.name !== e.currentTarget.id),
    );
  }

  function addCost() {
    if (target.length === 0) {
      alert("무엇 값은 필수입니다.");
    } else {
      setCostList([
        ...costList,
        {
          target: target,
          cost: money,
        },
      ]);
      setTarget("");
      setMoney(0);
    }
  }

  function deleteCost(e: React.MouseEvent<HTMLElement>) {
    setCostList(
      costList.filter(
        (cost: BillDetail) => cost?.target !== e.currentTarget.id,
      ),
    );
  }
  function reset() {
    setBumbai([]);
    setCostList([]);
    setPerson("");
    setMoney(0);
  }

  function save() {
    localStorage.setItem("bumbai", JSON.stringify(bumbai));
    localStorage.setItem("cost", JSON.stringify(costList));
    alert("저장되었습니다.");
  }
};
export default App;
