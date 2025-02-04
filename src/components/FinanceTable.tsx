import React, { useState, useEffect } from "react";
import { Table, Input, Form, Button, InputNumber, Popconfirm } from "antd";
import FinanceTableProps from "@/app/interfaces/FinanceTableProps";
import useFinanceTransaction from "@/app/services/useFinanceTransaction";
interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: any;
  index: number;
  children: React.ReactNode;
  [key: string]: any;
}

const FinanceTable = (props: FinanceTableProps) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(props.transactions);
  const [editingKey, setEditingKey] = useState<React.Key | null>(null);

  useEffect(() => {
    setData(props.transactions);
  }, [props.transactions]);

  const isEditing = (record: any) => record.id === editingKey;

  const edit = (key: React.Key) => {
    const record = data.find((item) => item.id === key);
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(key);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        await useFinanceTransaction().updateTransaction(key, row);
        setEditingKey(null);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteTransaction = async (key: React.Key) => {
    try {
      await useFinanceTransaction().deleteTransaction(key);
      setData(data.filter((item) => item.id !== key));
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps} key={dataIndex}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please Input ${title}!` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      editable: true,
    },
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
      editable: true,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "transaction_status",
      key: "transaction_status",
      editable: true,
    },
    {
      title: "Data de vencimento",
      dataIndex: "due_date",
      key: "due_date",
      render: (date: string) => {
        if (!date) return "Data não disponível";
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return "Data inválida";

        const offset = parsedDate.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(parsedDate.getTime() + offset);
        return adjustedDate.toLocaleDateString("pt-BR");
      },
    },
    {
      title: "Edição",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Button onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Salvar
            </Button>
            <Button onClick={cancel}>Cancelar</Button>
          </span>
        ) : (
          <Button
            disabled={editingKey !== null}
            onClick={() => edit(record.id)}
          >
            Editar
          </Button>
        );
      },
    },
    {
      title: "Exclusão",
      dataIndex: "delete",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Tem certeza que deseja excluir?"
          onConfirm={() => deleteTransaction(record.id)}
        >
          <Button danger>Excluir</Button>
        </Popconfirm>
      ),
    },
  ];

  const mergedColumns = columns.map((col, index) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      key: col.dataIndex || index,
      onCell: (record: { key: React.Key }) => ({
        record,
        inputType: col.dataIndex === "amount" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <h2 className="text-lg font-semibold mb-2">Transações</h2>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data.map((item) => ({
          ...item,
          key: item.id,
        }))}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default FinanceTable;
