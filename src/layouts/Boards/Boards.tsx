import ProcessingWrapper from '../../components/processingWrapper/ProcessingWrapper';
import { Methods } from '../../const/APIMethoods';
import { boardsURL } from '../../const/requestUrls';
import { useAxios } from '../../hooks/useAxios';
import { TBoard } from '../../models/board';
import BoardPreview from './BoardPreview/BoardPreview';

function Boards() {
  const { data, isLoading, isError, request } = useAxios({
    url: boardsURL(),
    method: Methods.GET,
  });

  const boards = data as TBoard[];
  return (
    <div className="boards">
      <div className="boards_wrapper">
        <ProcessingWrapper isLoading={isLoading} isError={isError} errortext="error">
          {boards?.map((board) => {
            return <BoardPreview {...board} key={board.id} updateBoards={request} />;
          })}
        </ProcessingWrapper>
      </div>
    </div>
  );
}

export default Boards;
