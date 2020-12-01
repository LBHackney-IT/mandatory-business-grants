import {
  /*ApplicationGrantAmountSelector,*/ handleOnChange,
} from './ApplicationGrantAmountSelector';

describe('<ApplicationGrantAmountSelector>', () => {
  describe('handleOnChange()', () => {
    it('Patches the grant application', async () => {
      const grantApplicationPatcherSpy = jest.fn();
      const setValueSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const setErrorSpy = jest.fn();

      const applicationId = 1;
      const storeAs = 'lsrgGrant';
      const grantAmountAwarded = '25565.0';
      await handleOnChange(
        setErrorSpy,
        setValueSpy,
        onChangeSpy,
        grantApplicationPatcherSpy,
        applicationId,
        storeAs
      )(grantAmountAwarded);
      expect(grantApplicationPatcherSpy).toHaveBeenCalledWith(applicationId, {
        [storeAs]: grantAmountAwarded,
      });
    });

    it('Sets the value to the awarded grant amount', async () => {
      const grantApplicationPatcherSpy = jest.fn();
      const setValueSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const setErrorSpy = jest.fn();

      const applicationId = 1;
      const storeAs = 'lsrgGrant';
      const grantAmountAwarded = '25565.0';
      await handleOnChange(
        setErrorSpy,
        setValueSpy,
        onChangeSpy,
        grantApplicationPatcherSpy,
        applicationId,
        storeAs
      )(grantAmountAwarded);

      expect(setValueSpy).toHaveBeenCalledWith(grantAmountAwarded);
    });
  });
});
