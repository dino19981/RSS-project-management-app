import { processingWrapperProps } from '../../models/processingWrapper';
import Loader from '../loader/loader';

function ProcessingWrapper({
  isLoading,
  isError,
  errortext,
  children,
  items,
}: processingWrapperProps) {
  if (isLoading && !items) {
    return <Loader />;
  }

  if (!!isError) {
    return <p>{errortext}</p>;
  }

  return <>{children}</>;
}

export default ProcessingWrapper;
