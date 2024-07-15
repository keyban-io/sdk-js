import type { ReactNode } from 'react';

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: 30,
    marginTop: 20,
    overflow: 'scroll',
    height: '100%',
  },
};

export const ActionBox = ({
  humanDescription,
  onTap,
  actionp,
  testId,
}: {
  humanDescription: string;
  testId: string;
  onTap: () => void;
  actionp: string;
}) => {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <p style={{ textAlign: 'center' }}>{humanDescription}</p>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button data-testId={testId} onClick={onTap}>
        <p
          style={{
            borderStyle: 'solid',
            borderColor: 'purple',
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            marginBottom: 50,
            textAlign: 'center',
          }}
        >
          {actionp}
        </p>
      </button>
    </div>
  );
};

export const InputBox = ({
  humanDescription,
  value,
  testId,
  setValue,
}: {
  humanDescription: string;
  testId: string;
  value: string;
  setValue: (val: string) => void;
}) => {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <p style={{ textAlign: 'center' }}>{humanDescription}</p>
      <input
        style={{
          borderStyle: 'solid',
          borderColor: 'purple',
          borderWidth: 1,
          padding: 10,
          marginTop: 20,
          marginBottom: 50,
          textAlign: 'center',
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testId={testId}
      />
    </div>
  );
};

export const AssertionBox = ({
  humanDescription,
  value,
  testId,
}: {
  humanDescription: string;
  testId: string;
  value: ReactNode;
}) => {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <p style={{ textAlign: 'center' }}>{humanDescription}</p>
      <p
        style={{
          borderStyle: 'solid',
          borderColor: 'purple',
          borderWidth: 1,
          padding: 10,
          marginTop: 20,
          marginBottom: 50,
          textAlign: 'center',
        }}
        data-testId={testId}
      >
        {value}
      </p>
    </div>
  );
};
