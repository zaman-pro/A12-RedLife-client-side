import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useGeoData = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGeoData = async () => {
      try {
        const [districtRes, upazilaRes] = await Promise.all([
          axios("/districts.json"),
          axios("/upazilas.json"),
        ]);
        setDistricts(districtRes.data);
        setUpazilas(upazilaRes.data);
      } catch (error) {
        toast.error("Failed to load location data");
        console.error("Geo data load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGeoData();
  }, []);

  return { districts, upazilas, loading };
};

export default useGeoData;
