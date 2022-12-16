import Column from "../components/column";
export default function KitchenPage(props) {
  return (
    <div className="columns-container">
      {props.columns.map((column) => (
        <Column
          index={column.statusIndex}
          statuses={props.statuses}
          key={column.status}
          text={column.status}
          orders={column.orders}
          changeStatus={props.changeStatus}
        />
      ))}
      console.log("hello world")
    </div>
  );
}
