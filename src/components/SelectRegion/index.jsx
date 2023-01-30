import {
    Box,
    Button,
    Radio,
    RadioGroup,
    Stack,
    VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import { getRegions } from "../../services";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function SelectRegion(props) {
    const ctx = useContext(AuthContext);

    const [radioValue, setRadioValue] = useState("0");
    const [regionInformation, setRegionInformation] = useState([]);

    const close = () => {
        props.closeModal();
        ctx.onChangeRegion(
            regionInformation[radioValue].regionName,
            regionInformation[radioValue].regionUrl,
        );
        setRadioValue(radioValue);
    };

    useEffect(() => {
        const get = async () => {
            const regionData = await getRegions(
                ctx.email.replace("@", "_"),
                ctx.baseUrl,
                ctx.token,
            );
            let filterRegionData = regionData[0].dcInfo.map((data) => {
                return {
                    regionName: data.locationInfo.city,
                    regionUrl: `https://${data.tags.api}`,
                };
            });
            filterRegionData.unshift({
                regionName: "GLOBAL",
                regionUrl: BASE_URL,
            });
            setRegionInformation(filterRegionData);
        };
        get().catch(console.error);
    }, [ctx.email, ctx.token]);

    return (
        <Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <VStack spacing={2} align="stretch">
                    <RadioGroup onChange={setRadioValue} value={radioValue}>
                        <Stack direction="column">
                            {regionInformation.map((data, index) => (
                                <Radio key={index} value={index.toString()}>
                                    {data.regionName}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </VStack>
            </Box>
            <Box
                display="flex"
                alignItems="right"
                justifyContent="right"
                width="100%"
            >
                <Button variant="ghost" onClick={close}>
                    Close
                </Button>
            </Box>
        </Box>
    );
}
