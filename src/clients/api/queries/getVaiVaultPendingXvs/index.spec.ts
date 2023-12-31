import BigNumber from 'bignumber.js';

import fakeAddress from '__mocks__/models/address';
import { VaiVault } from 'types/contracts';

import getVaiVaultPendingXvs from '.';

describe('api/queries/getVaiVaultPendingXvs', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        pendingXVS: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as VaiVault;

    try {
      await getVaiVaultPendingXvs({
        vaiVaultContract: fakeContract,
        accountAddress: fakeAddress,
      });

      throw new Error('getVaiVaultPendingXvs should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the pending XVS value in the correct format', async () => {
    const fakePendingXvsWei = new BigNumber('1000000000000000000000000000');
    const callMock = jest.fn(async () => fakePendingXvsWei);
    const pendingXvsMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        pendingXVS: pendingXvsMock,
      },
    } as unknown as VaiVault;

    const response = await getVaiVaultPendingXvs({
      vaiVaultContract: fakeContract,
      accountAddress: fakeAddress,
    });

    expect(callMock).toHaveBeenCalledTimes(1);
    expect(pendingXvsMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      pendingXvsWei: new BigNumber(fakePendingXvsWei),
    });
  });
});
