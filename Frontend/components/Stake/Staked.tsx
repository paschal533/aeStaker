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
  } from '@chakra-ui/react'
import { useContext } from "react";
import { StakerContext } from "../../context/StakerContext";

import { Button } from '../Home';

  const Staked = () => {
    const { assets, withdraw } = useContext(StakerContext);
    return (
        <TableContainer className="mt-8 items-center text-center justify-center bg-white rounded-md w-full">
        <Table variant='simple'>
            <Thead className="font-bold text-2xl">
            <Tr>
                <Th>Amount Staked</Th>
                <Th>Interest</Th>
                <Th>Percent Interest</Th>
                <Th>Days Remaining</Th>
                <Th>Withdraw</Th>
            </Tr>
            </Thead>
            <Tbody className="w-full items-center text-center justify-center">
            {assets?.reverse().map((asset : any) => {
                return(
                    <Tr>
                        <Td>{Number(asset.aeStaked)}</Td>
                        <Td>{asset.aeInterest}</Td>
                        <Td>{asset.percentInterest}%</Td>
                        <Td>{Math.floor(asset.daysRemaining)}</Td>
                        <Td>{asset.open ?<Button onClick={() => withdraw(asset.positionId)} title="withdraw" /> : 
                          <span className='bg-[#E7ECEE] text-red-600 p-2 rounded-md'>Closed</span>}
                        </Td>
                    </Tr>
                )
            })}
            </Tbody>
        </Table>
        </TableContainer>
    )
  }

export default Staked;