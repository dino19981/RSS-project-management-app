import AboutCourse from './AboutCourse';
import Features from './Features';
import Loader from '../../../components/loader/loader';
import PromoScreen from './PromoScreen';
import Team from './Team';
import { useAppSelector } from '../../../store/hooks';

export default function WelcomePage() {
  const { isLoadingUserData } = useAppSelector((state) => state.authorization);

  if (isLoadingUserData) {
    return <Loader />;
  }

  return (
    <>
      <PromoScreen />
      <Features />
      <AboutCourse />
      <Team />
    </>
  );
}
