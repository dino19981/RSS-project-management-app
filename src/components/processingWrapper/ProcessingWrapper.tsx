import { processingWrapperProps } from '../../models/processingWrapper';
import Loader from '../loader/loader';

function ProcessingWrapper({ isLoading, isError, errortext, children }: processingWrapperProps) {
  if (isLoading) {
    return <Loader />;
  }

  if (!!isError) {
    return <p>{errortext}</p>;
  }
  console.log(children, 'children');

  return <>{children}</>;
}

export default ProcessingWrapper;
