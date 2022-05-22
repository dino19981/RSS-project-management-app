import AboutCourse from '../../components/aboutCourse/AboutCourse';
import Features from '../../components/features/Features';
import PromoScreen from '../../components/promoScreen/PromoScreen';
import Team from '../../components/team/Team';

export default function MainPage() {
  return (
    <>
      <PromoScreen />
      <Features />
      <AboutCourse />
      <Team />
    </>
  );
}
