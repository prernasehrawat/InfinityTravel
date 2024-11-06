// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useUser } from "./UserContext";
// import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
//
// const ProfilePage: React.FC = () => {
//   const { user, updateUser } = useUser();
//   const [profileImage, setProfileImage] = useState<string | null>(user.profileImage || null);
//   const [isEditing, setIsEditing] = useState(false);
//
//   // State for editable fields
//   const [firstName, setFirstName] = useState(user.first_name);
//   const [lastName, setLastName] = useState(user.last_name);
//   const [email, setEmail] = useState(user.email);
//   const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
//
//   // State to store original values for cancel functionality
//   const [originalDetails, setOriginalDetails] = useState({
//     firstName: user.first_name,
//     lastName: user.last_name,
//     email: user.email,
//     phoneNumber: user.phone_number,
//   });
//
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//
//   // Load profile image from localStorage on mount
//   useEffect(() => {
//     const storedImage = localStorage.getItem("profileImage");
//     if (storedImage) {
//       setProfileImage(storedImage);
//     }
//   }, []);
//
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
//       if (!validImageTypes.includes(file.type)) {
//         setErrors((prev) => ({
//           ...prev,
//           profileImage: "Unsupported file type",
//         }));
//         return;
//       }
//
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64Image = reader.result as string;
//         setProfileImage(base64Image);
//         localStorage.setItem("profileImage", base64Image); // Save to localStorage
//         updateUser({ profileImage: base64Image }); // Update context
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//
//   const toggleEditing = () => {
//     setIsEditing(!isEditing);
//     setErrors({});
//     // Save current values in case of cancel
//     setOriginalDetails({
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//     });
//   };
//
//   const handleSave = () => {
//     const newErrors: { [key: string]: string } = {};
//
//     if (!firstName.trim()) newErrors.firstName = "First name is required.";
//     if (!lastName.trim()) newErrors.lastName = "Last name is required.";
//     if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Valid email is required.";
//     }
//     if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
//
//     setErrors(newErrors);
//
//     if (Object.keys(newErrors).length === 0) {
//       updateUser({
//         first_name: firstName,
//         last_name: lastName,
//         email: email,
//         phone_number: phoneNumber,
//         profileImage: profileImage || '', // Ensure profileImage is updated
//       });
//       setIsEditing(false);
//     }
//   };
//
//   const handleCancel = () => {
//     // Reset to original values
//     setFirstName(originalDetails.firstName);
//     setLastName(originalDetails.lastName);
//     setEmail(originalDetails.email);
//     setPhoneNumber(originalDetails.phoneNumber);
//     setIsEditing(false);
//   };
//
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//         <div className="mb-6 text-center">
//           <label htmlFor="imageUpload" className="cursor-pointer">
//             {profileImage ? (
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full mx-auto object-cover"
//               />
//             ) : (
//               <div className="w-32 h-32 rounded-full mx-auto bg-gray-300 flex items-center justify-center">
//                 <span className="text-gray-500">Upload Image</span>
//               </div>
//             )}
//           </label>
//           <input
//             id="imageUpload"
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="hidden"
//           />
//           {errors.profileImage && (
//             <p className="text-red-500">{errors.profileImage}</p>
//           )}
//         </div>
//
//         <h1 className="text-3xl font-bold text-blue-600 mb-2">
//           Hi, {firstName} {lastName}
//         </h1>
//         <p className="text-gray-500 mb-6">Welcome to your profile page</p>
//
//         <div className="text-left space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
//           <div className="flex items-center">
//             <strong className="w-40">First Name:</strong>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               <span>{firstName}</span>
//             )}
//           </div>
//           <div className="flex items-center">
//             <strong className="w-40">Last Name:</strong>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               <span>{lastName}</span>
//             )}
//           </div>
//           <div className="flex items-center">
//             <strong className="w-40">Email:</strong>
//             {isEditing ? (
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               <span>{email}</span>
//             )}
//           </div>
//           <div className="flex items-center">
//             <strong className="w-40">Phone Number:</strong>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//             ) : (
//               <span>{phoneNumber}</span>
//             )}
//           </div>
//         </div>
//
//         {isEditing ? (
//           <div className="flex justify-center gap-4 mt-6">
//             <button
//               onClick={handleCancel}
//               className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 inline-flex items-center"
//             >
//               <span className="mr-2">
//                 <FaTimes />
//               </span>
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 inline-flex items-center"
//             >
//               <span className="mr-2">
//                 <FaSave />
//               </span>
//               Save Changes
//             </button>
//           </div>
//         ) : (
//           <div className="flex justify-center">
//             <button
//               onClick={toggleEditing}
//               className="mt-6 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 inline-flex items-center"
//             >
//               <span className="mr-2">
//                 <FaEdit />
//               </span>
//               Edit Profile
//             </button>
//           </div>
//         )}
//
//         <div className="flex justify-center mt-6">
//           <Link to="/" className="text-blue-500 hover:underline">
//             Return to Home Page
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default ProfilePage;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import { useUser } from "./UserContext";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage || null);
  const [isEditing, setIsEditing] = useState(false);

  // State for editable fields
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);

  // State to store original values for cancel functionality
  const [originalDetails, setOriginalDetails] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phoneNumber: user.phone_number,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/"); // Redirect to the login page if not logged in
    }
  }, [user.isLoggedIn, navigate]);

  // Load profile image from localStorage on mount
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Unsupported file type",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setProfileImage(base64Image);
        localStorage.setItem("profileImage", base64Image); // Save to localStorage
        updateUser({ profileImage: base64Image }); // Update context
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setErrors({});
    // Save current values in case of cancel
    setOriginalDetails({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  };

  // const handleSave = () => {
  //   const newErrors: { [key: string]: string } = {};
  //
  //   if (!firstName.trim()) newErrors.firstName = "First name is required.";
  //   if (!lastName.trim()) newErrors.lastName = "Last name is required.";
  //   if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = "Valid email is required.";
  //   }
  //   if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
  //
  //   setErrors(newErrors);
  //
  //   if (Object.keys(newErrors).length === 0) {
  //     updateUser({
  //       first_name: firstName,
  //       last_name: lastName,
  //       email: email,
  //       phone_number: phoneNumber,
  //       profileImage: profileImage || '', // Ensure profileImage is updated
  //     });
  //     setIsEditing(false);
  //   }
  // };
  const handleSave = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/user/update-user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.user_id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,

          }),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          updateUser({
            user_id: user.user_id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,

          });
          setIsEditing(false);
          alert('Profile updated successfully');
        } else {
          alert('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile');
      }
    }
  };


  const handleCancel = () => {
    // Reset to original values
    setFirstName(originalDetails.firstName);
    setLastName(originalDetails.lastName);
    setEmail(originalDetails.email);
    setPhoneNumber(originalDetails.phoneNumber);
    setIsEditing(false);
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <div className="mb-6 text-center">
            {/*<label htmlFor="imageUpload" className="cursor-pointer">*/}
            {/*  {profileImage ? (*/}
            {/*      <img*/}
            {/*          src={profileImage}*/}
            {/*          alt="Profile"*/}
            {/*          className="w-32 h-32 rounded-full mx-auto object-cover"*/}
            {/*      />*/}
            {/*  ) : (*/}
            {/*      <div className="w-32 h-32 rounded-full mx-auto bg-gray-300 flex items-center justify-center">*/}
            {/*        <span className="text-gray-500">Upload Image</span>*/}
            {/*      </div>*/}
            {/*  )}*/}
            {/*</label>*/}
            <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />
            {errors.profileImage && (
                <p className="text-red-500">{errors.profileImage}</p>
            )}
          </div>

          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Hi, {firstName} {lastName}
          </h1>
          <p className="text-gray-500 mb-6">Welcome to your profile page</p>

          <div className="text-left space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
            <div className="flex items-center">
              <strong className="w-40">First Name:</strong>
              {isEditing ? (
                  <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
              ) : (
                  <span>{firstName}</span>
              )}
            </div>
            <div className="flex items-center">
              <strong className="w-40">Last Name:</strong>
              {isEditing ? (
                  <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
              ) : (
                  <span>{lastName}</span>
              )}
            </div>
            <div className="flex items-center">
              <strong className="w-40">Email:</strong>
              {isEditing ? (
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
              ) : (
                  <span>{email}</span>
              )}
            </div>
            <div className="flex items-center">
              <strong className="w-40">Phone Number:</strong>
              {isEditing ? (
                  <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
              ) : (
                  <span>{phoneNumber}</span>
              )}
            </div>
          </div>

          {isEditing ? (
              <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 inline-flex items-center"
                >
              <span className="mr-2">
                <FaTimes />
              </span>
                  Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 inline-flex items-center"
                >
              <span className="mr-2">
                <FaSave />
              </span>
                  Save Changes
                </button>
              </div>
          ) : (
              <div className="flex justify-center">
                <button
                    onClick={toggleEditing}
                    className="mt-6 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 inline-flex items-center"
                >
              <span className="mr-2">
                <FaEdit />
              </span>
                  Edit Profile
                </button>
              </div>
          )}

          <div className="flex justify-center mt-6">
            <Link to="/" className="text-blue-500 hover:underline">
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;
