import { useEffect, useState } from "react";

const useFilteredUpazilas = ({
  selectedDistrict,
  selectedUpazila,
  upazilas,
  setValue,
}) => {
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (!selectedDistrict) {
      setFilteredUpazilas([]);
      setValue?.("upazila", "");
      return;
    }

    const related = upazilas.filter(
      (u) => u.district_id === selectedDistrict.toString()
    );
    setFilteredUpazilas(related);

    const isStillValid = related.find((u) => u.id === selectedUpazila);
    if (!isStillValid) {
      setValue?.("upazila", "");
    }
  }, [selectedDistrict, selectedUpazila, upazilas, setValue]);

  return filteredUpazilas;
};

export default useFilteredUpazilas;
