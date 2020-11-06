import { ContractCallArgument, ContractCallArgumentType } from '@stacks/connect';
import {
  uintCV,
  intCV,
  falseCV,
  trueCV,
  contractPrincipalCV,
  standardPrincipalCV,
  bufferCV,
  StacksNetwork,
} from '@blockstack/stacks-transactions';
import RPCClient from '@stacks/rpc-client';
import BigNumber from 'bignumber.js';
import { defaultStacksNetwork } from './constants';

export const encodeContractCallArgument = ({ type, value }: ContractCallArgument) => {
  switch (type) {
    case ContractCallArgumentType.UINT:
      return uintCV(value);
    case ContractCallArgumentType.INT:
      return intCV(value);
    case ContractCallArgumentType.BOOL:
      if (value === 'false' || value === '0') return falseCV();
      else if (value === 'true' || value === '1') return trueCV();
      else throw new Error(`Unexpected Clarity bool value: ${JSON.stringify(value)}`);
    case ContractCallArgumentType.PRINCIPAL:
      if (value.includes('.')) {
        const [addr, name] = value.split('.');
        return contractPrincipalCV(addr, name);
      } else {
        return standardPrincipalCV(value);
      }
    case ContractCallArgumentType.BUFFER:
      return bufferCV(Buffer.from(value));
    default:
      throw new Error(`Unexpected Clarity type: ${type}`);
  }
};

export const getRPCClient = (network: StacksNetwork = defaultStacksNetwork) => {
  const { coreApiUrl } = network;
  return new RPCClient(coreApiUrl);
};

export const stacksValue = ({
  value,
  fixedDecimals = false,
}: {
  value: number;
  fixedDecimals?: boolean;
}) => {
  const microStacks = new BigNumber(value);
  const stacks = microStacks.shiftedBy(-6);
  const stxString = fixedDecimals ? stacks.toFormat(6) : stacks.decimalPlaces(6).toFormat();
  return `${stxString} STX`;
};
