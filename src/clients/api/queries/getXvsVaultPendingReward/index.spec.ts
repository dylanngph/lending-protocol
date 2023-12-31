import BigNumber from 'bignumber.js';

import fakeAccountAddress from '__mocks__/models/address';
import { TOKENS } from 'constants/tokens';
import { XvsVault } from 'types/contracts';

import getXvsVaultPendingReward from '.';

const xvsTokenAddress = TOKENS.xvs.address;
const fakePid = 1;

describe('api/queries/getXvsVaultPendingReward', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        pendingReward: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as XvsVault;

    try {
      await getXvsVaultPendingReward({
        xvsVaultContract: fakeContract,
        rewardTokenAddress: xvsTokenAddress,
        accountAddress: fakeAccountAddress,
        poolIndex: fakePid,
      });

      throw new Error('getXvsVaultTotalAllocationPoints should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the pending reward of the user in wei on success', async () => {
    const fakeOutput = '2000000000000000000';

    const callMock = jest.fn(async () => fakeOutput);
    const pendingRewardMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        pendingReward: pendingRewardMock,
      },
    } as unknown as XvsVault;

    const response = await getXvsVaultPendingReward({
      xvsVaultContract: fakeContract,
      rewardTokenAddress: xvsTokenAddress,
      accountAddress: fakeAccountAddress,
      poolIndex: fakePid,
    });

    expect(callMock).toHaveBeenCalledTimes(1);
    expect(pendingRewardMock).toHaveBeenCalledTimes(1);
    expect(pendingRewardMock).toHaveBeenCalledWith(xvsTokenAddress, fakePid, fakeAccountAddress);
    expect(response).toEqual({
      pendingXvsReward: new BigNumber(fakeOutput),
    });
  });
});
