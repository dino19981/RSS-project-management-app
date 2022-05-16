import ProcessingWrapper from '../../components/processingWrapper/ProcessingWrapper';
import { useAxios } from '../../hooks/useAxios';
import BoardPreview from './BoardPreview/BoardPreview';

function Boards() {
  const { data: boards, isLoading, isError, request } = useAxios({ url: '/boards', method: 'get' });

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
