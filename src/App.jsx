import "./App.css";
import SEO from "./components/SEO";
import "./i18n";
import HomePage from "./pages/mianPage/HomePage";

function App() {
  return (
    <>
    <SEO
        title="JobSeek - Find Your Dream Job Easily"
        description="Join JobSeek, the leading job portal where you can discover top career opportunities and land your dream job effortlessly."
        image="https://uknow.uky.edu/sites/default/files/styles/uknow_story_image/public/job-thumbs%20up.jpg"
        url="https://job-seek-seven.vercel.app/"
      />
      <HomePage />
    </>
  );
}

export default App;
