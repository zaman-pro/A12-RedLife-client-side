import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGeoData from "../../hooks/useGeoData";
import useFilteredUpazilas from "../../hooks/useFilteredUpazilas";
import Loading from "../../components/Shared/Loading/Loading";

const DonorCard = ({ donor, districts, upazilas }) => {
  const districtName = districts.find((d) => d.id === donor.district)?.name;
  const upazilaName = upazilas.find((u) => u.id === donor.upazila)?.name;

  return (
    <div className="bg-base-300 text-base-content rounded-lg p-4 space-y-2 bg-gradient-to-r from-base-100 to-blue-50 shadow-md hover:shadow-lg hover:shadow-accent transition-shadow duration-300">
      <p>
        <strong>Name:</strong> {donor.name}
      </p>
      <p>
        <strong>Email:</strong> {donor.email}
      </p>
      <p>
        <strong>Blood Group:</strong> {donor.bloodGroup}
      </p>
      <p>
        <strong>Location:</strong> {upazilaName}, {districtName}
      </p>
    </div>
  );
};

const SearchPage = () => {
  const axiosPublic = useAxiosPublic();
  const { districts, upazilas } = useGeoData();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("district");
  const selectedUpazila = watch("upazila");
  const filteredUpazilas = useFilteredUpazilas({
    selectedDistrict,
    selectedUpazila,
    upazilas,
    setValue,
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axiosPublic(`/donors/search`, {
        params: formData,
      });
      setDonors(data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold mb-4 text-center">Search Donors</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-300 p-6 rounded-lg  space-y-6 bg-gradient-to-r from-base-100 to-blue-100 shadow-lg text-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Blood Group</label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
            {errors.bloodGroup && (
              <p className="text-red-500 text-xs mt-1">Required</p>
            )}
          </div>

          <div>
            <label className="label">District</label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-xs mt-1">Required</p>
            )}
          </div>

          <div>
            <label className="label">Upazila</label>
            <select
              {...register("upazila", { required: true })}
              className="select select-bordered w-full"
              disabled={!selectedDistrict}
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upa) => (
                <option key={upa.id} value={upa.id}>
                  {upa.name}
                </option>
              ))}
            </select>
            {errors.upazila && (
              <p className="text-red-500 text-xs mt-1">Required</p>
            )}
          </div>
        </div>

        <button type="submit" className="btn bg-secondary text-white">
          Search
        </button>
      </form>

      {/* Donor Result */}
      {loading ? (
        <Loading />
      ) : donors.length > 0 ? (
        <div>
          <div className="divider my-12 before:bg-secondary after:bg-secondary">
            <h2 className="text-xl font-semibold my-6 text-center">
              Found Donors
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <DonorCard
                key={donor._id}
                donor={donor}
                districts={districts}
                upazilas={upazilas}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">
          No donors found for the selected criteria.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
