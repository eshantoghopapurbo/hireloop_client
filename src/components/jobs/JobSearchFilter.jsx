// import { TextField, InputGroup, Label, Select, ListBox, Description, Header } from "@heroui/react";
// import { Magnifier } from "@gravity-ui/icons"; // Assuming you are using this for the icon

// export default function JobSearchFilter({ onFilterChange }) {
//     return (
//         <div className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
//             {/* Search Input */}
//             <TextField className="flex-1" onChange={(val) => onFilterChange({ search: val })}>
//                 <Label className="text-white mb-2 block">Search Jobs</Label>
//                 <InputGroup>
//                     <InputGroup.Prefix><Magnifier size={20} className="text-whit-400" /></InputGroup.Prefix>
//                     <InputGroup.Input placeholder="Search by title..." />
//                 </InputGroup>
//             </TextField>

//             {/* Category Select */}
//             <Select onSelectionChange={(key) => onFilterChange({ category: key })}>
//                 <Label className="text-white mb-2 block">Category</Label>
//                 <Select.Trigger>
//                     <Select.Value placeholder="Select Category" />
//                     <Select.Indicator />
//                 </Select.Trigger>
//                 <Select.Popover>
//                     <ListBox>
//                         <ListBox.Item key="DevOps"><Label>DevOps</Label></ListBox.Item>
//                         <ListBox.Item key="Mobile Development"><Label>Mobile Development</Label></ListBox.Item>
//                         <ListBox.Item key="Frontend"><Label>Frontend</Label></ListBox.Item>
//                     </ListBox>
//                 </Select.Popover>
//             </Select>
//         </div>
//     );
// }


import { TextField, InputGroup, Label, Select, ListBox } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";

export default function JobSearchFilter({ onFilterChange, filters }) { // এখানে filters প্রপসটি রিসিভ করুন
    return (
        <div className="flex flex-col md:flex-row gap-6 mb-8 p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
            {/* Search Input */}
            <TextField 
                className="flex-1" 
                value={filters.search} // এটি যোগ করুন
                onChange={(val) => onFilterChange({ search: val })}
            >
                <Label className="text-white mb-2 block">Search Jobs</Label>
                <InputGroup>
                    <InputGroup.Prefix><Magnifier size={20} className="text-gray-400" /></InputGroup.Prefix>
                    <InputGroup.Input placeholder="Search by title..." />
                </InputGroup>
            </TextField>

            {/* Category Select (এটিও controlled করা ভালো) */}
            <Select 
                selectedKey={filters.category} // এটি যোগ করুন
                onSelectionChange={(key) => onFilterChange({ category: key })}
            >
                <Label className="text-white mb-2 block">Category</Label>
                <Select.Trigger>
                    <Select.Value placeholder="Select Category" />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item key="DevOps"><Label>DevOps</Label></ListBox.Item>
                        <ListBox.Item key="Mobile Development"><Label>Mobile Development</Label></ListBox.Item>
                        <ListBox.Item key="Frontend"><Label>Frontend</Label></ListBox.Item>
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    );
}