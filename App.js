import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Navigation } from "./src/components/Navigation";
import { Provider } from "react-redux";
import { store } from "./store";
import Loading from "./src/components/Loading";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Provider store={store}>{loading ? <Loading /> : <Navigation />}</Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
