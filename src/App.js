import logo from "./logo.svg";
import "./App.css";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { Button, Empty, Form, Image, Input, List, Select, Slider } from "antd";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const muiHeaderVariants = [
  { value: "h1", label: "Header 1" },
  { value: "h2", label: "Header 2" },
  { value: "h3", label: "Header 3" },
  { value: "h4", label: "Header 4" },
  { value: "h5", label: "Header 5" },
  { value: "h6", label: "Header 6" },
];
const App = () => {
  const [activeName, setActiveName] = useState("Enter Name");
  const [names, setNames] = useState([]);
  const [nameSize, setNameSize] = useState("h2");
  const [top, setTop] = useState(42);
  const [personForm] = Form.useForm();

  const generatePDF = async () => {
    const element = document.getElementById("my-html-element");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF();
    doc.addImage(imgData, "PNG", 0, 0);
    doc.save("my_document.pdf");
  };
  return (
    <Stack flex={1} direction={"row"} position={"relative"}>
      <Stack flex={1} p={2} gap={2}>
        <Typography variant="h5">Certificate&nbsp;Generator</Typography>
        <Form
          form={personForm}
          layout="vertical"
          onFinish={(values) => {
            setNames((prev) => [...prev, values]);
            personForm.resetFields();
          }}
        >
          <Form.Item label="Name" name="firstName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Surname"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
        <Divider></Divider>
        <List>
          {names.length === 0 && <Empty description="No Names" />}
          {names.map((person) => {
            return (
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    setActiveName(`${person.firstName} ${person.lastName}`);
                  }}
                >
                  <ListItemText
                    primary={`${person.firstName} ${person.lastName}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Stack>
      <Divider flexItem orientation="vertical" />
      <Stack p={2} width={500}>
        <Stack flex={1} gap={2}>
          <Stack>
            <Divider>Name Position</Divider>
            <Slider
              step={0.5}
              defaultValue={top}
              onChange={(v) => {
                setTop(v);
              }}
              max={100}
              min={0}
            >
              Position
            </Slider>
          </Stack>
          <Stack>
            <Divider>Size</Divider>
            <Select
              defaultValue={nameSize}
              onChange={(v, o) => {
                setNameSize(v);
              }}
              options={muiHeaderVariants}
            />
          </Stack>
        </Stack>
        <Button
          onClick={() => {
            generatePDF();
          }}
          type="primary"
        >
          Download Certificate
        </Button>
      </Stack>
      <Divider flexItem orientation="vertical" />
      <Stack p={1}>
        <Stack
          id="my-html-element"
          position={"relative"}
          sx={{ width: "210mm", height: "297mm", border: "solid 1px #171717" }}
        >
          <Stack
            position={"absolute"}
            zIndex={2}
            top={`${top}%`}
            left={0}
            right={0}
            textAlign={"center"}
          >
            <Typography variant={nameSize}>{activeName}</Typography>
          </Stack>
          <Image
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={require("./assets/certificate.png")}
            alt="certificate"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default App;
