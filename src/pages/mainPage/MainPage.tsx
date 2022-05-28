import AboutCourse from '../../components/aboutCourse/AboutCourse';
import Features from '../../components/features/Features';
import Loader from '../../components/loader/loader';
import PromoScreen from '../../components/promoScreen/PromoScreen';
import Team from '../../components/team/Team';
import { useAppSelector } from '../../store/hooks';

export default function MainPage() {
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
