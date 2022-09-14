import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useContext } from "react";
import { StakerContext } from "../../context/StakerContext";

import { Button } from "../Home";
import Banner from "./AuthBanner";

const Staked = () => {
  const { assets, withdraw, btnLoading } = useContext(StakerContext);
  return (
    <TableContainer className="mt-8 items-center text-center justify-center bg-white rounded-md w-full">
      <Table variant="simple">
        <Thead className="font-bold text-2xl">
          {assets?.length > 0 ? (
            <Tr>
              <Th>Amount Staked</Th>
              <Th>Interest</Th>
              <Th>Percent Interest</Th>
              <Th>Days Remaining</Th>
              <Th>Withdraw</Th>
            </Tr>
          ) : (
            <Th>No record</Th>
          )}
        </Thead>
        {assets?.length > 0 ? (
          <Tbody className="w-full items-center text-center justify-center">
            {assets?.reverse().map((asset: any) => {
              return (
                <Tr>
                  <Td>{Number(asset.aeStaked)}</Td>
                  <Td>{asset.aeInterest}</Td>
                  <Td>{asset.percentInterest}%</Td>
                  <Td>{Math.floor(asset.daysRemaining)}</Td>
                  <Td>
                    {asset.open ? (
                      <Button
                        onClick={() => withdraw(asset.positionId)}
                        title={btnLoading ? "laoding..." : "withdraw"}
                      />
                    ) : (
                      <span className="bg-[#E7ECEE] text-red-600 p-2 rounded-md">
                        Closed
                      </span>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        ) : (
          <div className="text-center w-full">
            <Banner text="No staking record Found. Stake some tokens" />
          </div>
        )}
      </Table>
    </TableContainer>
  );
};

export default Staked;
