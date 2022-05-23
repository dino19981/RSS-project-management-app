export default function CreateBoard() {
  return (
    <button className="btn-new-board">
      <svg className="btn-new-board__icon" width="24" height="24">
        <use xlinkHref="#create-icon" />
      </svg>
      <span className="btn-new-board__text">Создать новую доску</span>
    </button>
  );
}
