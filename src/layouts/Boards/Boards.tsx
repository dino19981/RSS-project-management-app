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
      <ul className="boards__list">
        <ProcessingWrapper isLoading={isLoading} isError={isError} errortext="error">
          {boards?.map((board) => {
            console.log('board', board);
            return (
              <li className="boards__item" key={board.id}>
                <BoardPreview {...board} updateBoards={request} />
              </li>
            );
          })}
        </ProcessingWrapper>
      </ul>
    </div>
  );
}

export default Boards;
