import App from "./App";
import React from "react";
import renderer from "react-test-renderer";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  //mock navigate
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock("./__mocks__/expo-sqlite", () => ({
  //mock dataBase
  openDatabase: jest.fn(() => ({
    transaction: jest.fn(),
  })),
}));

jest.mock("expo-font");
jest.mock("expo-asset");

describe("<App />", () => {
  it("has 1 child", () => {
    // Mock the fileInfo and hash for the test
    const fileInfo = { exists: true }; // Mock fileInfo with exists property set to true
    const hash = "somehash"; // Mock hash for the test

    const tree = renderer
      .create(<App fileInfo={fileInfo} hash={hash} />)
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});
