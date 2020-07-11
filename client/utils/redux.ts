type AsyncActions = {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
};

export const asyncActionCreator = (actionName: string): AsyncActions => {
  const asyncTypeAction: string[] = ['_REQUEST', '_SUCCESS', '_FAILURE'];

  return {
    REQUEST: actionName + asyncTypeAction[0],
    SUCCESS: actionName + asyncTypeAction[1],
    FAILURE: actionName + asyncTypeAction[2],
  };
};
