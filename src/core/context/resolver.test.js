import contextResolver from './resolver';

jest.mock('../statemgmt/store', () => {
  return {
    getState: () => {
      return {
        Level1Obj: {
          Level2Obj: {
            Level3Array: [
              {
                Level4Obj: {
                  name: 'Jagadish',
                },
              },
            ],
          },
          Level2Array: [],
        },
      };
    },
  };
});

describe('ContextResolvers ', () => {
  it('should return the resolved value using getResolvedValueFromObject method', () => {
    const inputObject = {
      Level1Obj: {
        Level2Obj: {
          Level3Array: [
            {
              Level4Obj: {
                name: 'Jagadish',
              },
            },
          ],
        },
      },
    };
    expect(
      contextResolver.getResolvedValueFromObject(
        inputObject,
        ['Level1Obj', 'Level2Obj', 'Level3Array', 0, 'Level4Obj'],
        '.name'
      )
    ).toEqual('Jagadish');
  });

  it('should return the resolved value using getValue method', () => {
    expect(
      contextResolver.getValue(['Level1Obj', 'Level2Obj', 'Level3Array', 0, 'Level4Obj'], '.name')
    ).toEqual('Jagadish');
  });
});
