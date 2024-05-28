import { KeybanAsyncStorage, useKeybanEddsa } from "@keyban/sdk-react-native";
import type { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const keybanAsyncStorage = new KeybanAsyncStorage();

export const Main = () => {
  const { createAccount, knownAccounts, clientStatus } = useKeybanEddsa();

  const handleAccCreation = () => {
    createAccount(keybanAsyncStorage);
  };

  return (
    <>
      <View style={styles.container}>
        <AssertionBox
          humanDescription="Client health check result"
          testId="client-health"
          value={clientStatus}
        />
        <AssertionBox
          humanDescription="Below is an address of an first account"
          testId="first-address"
          value={knownAccounts[0]?.address}
        />
        <ActionBox
          humanDescription="Button to init EDDSA dkg process"
          actionText="Start dkg"
          testId="start-eddsa-dkg-action"
          onTap={handleAccCreation}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    marginTop: 20,
    overflow: "scroll",
    height: "100%",
  },
});

const ActionBox = ({
  testId,
  humanDescription,
  onTap,
  actionText,
}: {
  humanDescription: string;
  testId: string;
  onTap: () => void;
  actionText: string;
}) => {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text style={{ textAlign: "center" }}>{humanDescription}</Text>
      <TouchableOpacity onPress={onTap} testID={testId}>
        <Text
          style={{
            borderStyle: "solid",
            borderColor: "purple",
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          {actionText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const AssertionBox = ({
  testId,
  humanDescription,
  value,
}: {
  humanDescription: string;
  testId: string;
  value: ReactNode;
}) => {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text style={{ textAlign: "center" }}>{humanDescription}</Text>
      <Text
        testID={testId}
        style={{
          borderStyle: "solid",
          borderColor: "purple",
          borderWidth: 1,
          padding: 10,
          marginTop: 20,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        {value}
      </Text>
    </View>
  );
};
