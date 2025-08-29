
import { useSearchParams } from "react-router-dom";
import { useGetPropertById } from "../modules/property/hooks/property.queries";
import capitalize from "../components/ui/utils/capitalize";
import { formatPrice } from "../utils/formatprice";
import { Button } from "../components/ui";
import LabelledText from "../components/ui/Labeled Text/labelledtext";
import { FaCheck } from "react-icons/fa";
const features = ["Air Conditioning", "Wi-Fi", "Kitchen", "Parking", "Swimming Pool", "Lawn", "Garden", "Gym", "Club House", "BBQ"];
const ListingDetails = () => {
    //const and state variables
    const [searchParams] = useSearchParams();
    const propertyId = searchParams.get('propertyId');
    const { data: PropertyData } = useGetPropertById(propertyId ?? "");
    return (
        <div className="flex flex-col gap-4">
            <img src={PropertyData?.data?.propertyImage ?? ""} alt="" className="rounded w-full h-[400px] object-cover" />
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <span className="text-2xl">{capitalize(PropertyData?.data?.propertyName ?? "")}</span>
                    <span>{capitalize(PropertyData?.data?.location ?? "")}</span>
                </div>
                <div>
                    <span className="text-2xl font-semibold"> {formatPrice(PropertyData?.data?.rent || 0)}</span>
                </div>
            </div>
            <span className="text-2xl">Features: </span>
            <div className="w-full grid grid-cols-4 gap-3">
                {features?.map((feature) => (
                    <LabelledText key={feature} icon={<FaCheck />} label={feature} />
                ))}
            </div>

            {/* <Divider /> */}
            {/* <div className="flex flex-col gap-6">
                <Typography variant="body2" sx={{ color: '#212529', fontSize: "24px" }}>
                    HOST EMAIL
                </Typography>
                <Typography variant="body2" sx={{ color: '#212529', fontSize: "16px" }}>
                    lucie@example.com
                </Typography>
                <div>
                    <Button variant="contained">BOOK NOW</Button>
                </div>
            </div> */}
            {/* <div className="flex items-center gap-6 py-4 px-6 w-[860px] bg-[#ebe7e7e7] rounded">
                <div className="flex gap-3">
                    <div>
                        <Avatar />
                    </div>
                    <div className="">
                        <Typography variant="body2" sx={{ color: '#3b85db', fontSize: "20px" }}>
                            Lucie
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#212529', fontSize: "16px" }}>
                            I love skating, eating out and watching YouTube, looking for likeminded folk to live with.
                        </Typography>
                    </div>
                </div>
                <div className="w-fit">
                    <Button variant="contained" size="small">VIEW PROFILE</Button>
                </div>
            </div> */}
            <div className="flex items-center justify-end">
                <Button size="sm" variant="solid">Book Now</Button>
            </div>
        </div>
    )
}

export default ListingDetails