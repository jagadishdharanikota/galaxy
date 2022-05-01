import { getTestDependencyRelativePath, loadModuleAsync } from '../../platform-utils';
import {
  initialState,
  getLayoutType1ActionAndAfterState,
  getLayoutType2ActionAndAfterState,
  getLayoutType3ActionAndAfterState,
  getContolType1ActionAndAfterState,
  getLayoutType1DeleteActionAndAfterState,
  getLayoutType2DeleteActionAndAfterState,
  getLayoutType1MoveActionAndAfterState,
  getLayoutType2MoveActionAndAfterState,
} from './viewDesignerData';

const dependencyFilePath = getTestDependencyRelativePath(__filename);
let viewDesignerReducer;

// Importing module asynchronosly before all the tests are ran
beforeAll(async (done) => {
  viewDesignerReducer = await loadModuleAsync(dependencyFilePath);
  done();
});

describe('view reducer with ADD_DESIGN_ITEM action', () => {
  it('should add design item layout 1*1 as children to the designer', () => {
    const { action, afterState } = getLayoutType1ActionAndAfterState();
    expect(viewDesignerReducer(initialState, action)).toEqual(afterState);
  });

  it('should add design item layout 1*1 as sibiling below previou1 1*1 to the designer', () => {
    const { afterState: afterState1 } = getLayoutType1ActionAndAfterState();
    const { action, afterState: afterState2 } = getLayoutType2ActionAndAfterState();
    expect(viewDesignerReducer(afterState1, action)).toEqual(afterState2);
  });

  it('should add design item layout 1*2 as children of second 1*1 layout', () => {
    const { afterState: afterState2 } = getLayoutType2ActionAndAfterState();
    const { action, afterState: afterState3 } = getLayoutType3ActionAndAfterState();
    expect(viewDesignerReducer(afterState2, action)).toEqual(afterState3);
  });

  it('should add design item text input as children of second column in 1*2 layout', () => {
    const { afterState: afterState3 } = getLayoutType3ActionAndAfterState();
    const { action, afterState: afterState4 } = getContolType1ActionAndAfterState();
    expect(viewDesignerReducer(afterState3, action)).toEqual(afterState4);
  });
});

describe('view reducer with DELETE_DESIGN_ITEM action', () => {
  let afterSetupState;

  beforeAll(() => {
    const { action: action1, afterState: afterState1 } = getLayoutType1ActionAndAfterState();
    const { action: action2, afterState: afterState2 } = getLayoutType2ActionAndAfterState();
    const { action: action3, afterState: afterState3 } = getLayoutType3ActionAndAfterState();
    const { action: action4, afterState: afterState4 } = getContolType1ActionAndAfterState();
    viewDesignerReducer(initialState, action1);
    viewDesignerReducer(afterState1, action2);
    viewDesignerReducer(afterState2, action3);
    viewDesignerReducer(afterState3, action4);
    afterSetupState = afterState4;
  });

  it('should delete design item input field in second column of layout 1*2', () => {
    const {
      action,
      afterState: afterLayoutDeleteState,
    } = getLayoutType1DeleteActionAndAfterState();
    expect(viewDesignerReducer(afterSetupState, action)).toEqual(afterLayoutDeleteState);
  });

  it('should delete design item 1*2 layout inside the 1*1 layout', () => {
    const { afterState: afterLayout1DeleteState } = getLayoutType1DeleteActionAndAfterState();
    const {
      action,
      afterState: afterLayout2DeleteState,
    } = getLayoutType2DeleteActionAndAfterState();
    expect(viewDesignerReducer(afterLayout1DeleteState, action)).toEqual(afterLayout2DeleteState);
  });
});

describe('view reducer with MOVE_DESIGN_ITEM action', () => {
  let afterSetupState;

  beforeAll(() => {
    const { action: action1, afterState: afterState1 } = getLayoutType1ActionAndAfterState();
    const { action: action2, afterState: afterState2 } = getLayoutType2ActionAndAfterState();
    const { action: action3, afterState: afterState3 } = getLayoutType3ActionAndAfterState();
    const { action: action4, afterState: afterState4 } = getContolType1ActionAndAfterState();
    viewDesignerReducer(initialState, action1);
    viewDesignerReducer(afterState1, action2);
    viewDesignerReducer(afterState2, action3);
    viewDesignerReducer(afterState3, action4);
    afterSetupState = afterState4;
  });

  it('should move design item layout 1*1 above its sibling layout 1*1', () => {
    const { action, afterState: afterLayoutMoveState } = getLayoutType1MoveActionAndAfterState();
    expect(viewDesignerReducer(afterSetupState, action)).toEqual(afterLayoutMoveState);
  });

  it('should move design item layout 1*1 below its sibling layout 1*1', () => {
    const {
      action: action1,
      afterState: afterLayout1MoveState,
    } = getLayoutType1MoveActionAndAfterState();
    viewDesignerReducer(afterSetupState, action1);
    const {
      action: action2,
      afterState: afterLayout2MoveState,
    } = getLayoutType2MoveActionAndAfterState();
    expect(viewDesignerReducer(afterLayout1MoveState, action2)).toEqual(afterLayout2MoveState);
  });

  it('should do nothing when design item layout 1*1 which is last in the designer area is moved down', () => {
    const {
      action: action1,
      afterState: afterLayout1MoveState,
    } = getLayoutType1MoveActionAndAfterState();
    viewDesignerReducer(afterSetupState, action1);
    const {
      action: action2,
      afterState: afterLayout2MoveState,
    } = getLayoutType2MoveActionAndAfterState();
    expect(viewDesignerReducer(afterLayout1MoveState, action2)).toEqual(afterLayout2MoveState);

    const action3 = {
      type: 'MOVE_DESIGN_ITEM',
      payload: {
        path: ['ContainerGroupState', 'NewView', 'configurations', 'children', 1],
        operation: 'MOVE_DOWN',
      },
    };

    // State should be same no change even after this action
    expect(viewDesignerReducer(afterLayout2MoveState, action3)).toEqual(afterLayout2MoveState);
  });
});
