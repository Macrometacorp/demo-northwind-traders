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

    const [radioValue, setRadioValue] = useState(ctx.baseUrl);
    const [regionInformation, setRegionInformation] = useState([]);

    const close = () => {
        props.closeModal();
        const getRegion = regionInformation.filter(
            (data) => data.regionUrl === radioValue,
        );
        ctx.onChangeRegion(getRegion[0].regionName, radioValue);
    };

    const radioGroupChange = (value) => {
        setRadioValue(value);
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
            console.log(filterRegionData);
            filterRegionData.unshift({
                regionName: "GLOBAL",
                regionUrl: BASE_URL,
            });
            setRegionInformation(filterRegionData);
        };
        get().catch(console.error);
    }, [ctx.email, ctx.baseUrl, ctx.token]);

    return (
        <Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                <VStack spacing={2} align="stretch">
                    <RadioGroup onChange={radioGroupChange} value={radioValue}>
                        <Stack direction="column">
                            {regionInformation.map((data, index) => (
                                <Radio key={index} value={data.regionUrl}>
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
