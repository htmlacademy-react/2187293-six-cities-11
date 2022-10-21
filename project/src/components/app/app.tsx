import HomeScreen from '../../pages/home/HomeScreen';

type AppScreenProps = {
  variants: number;
};

function App({ variants }: AppScreenProps): JSX.Element {
  return <HomeScreen variants={variants} />;
}

export default App;
