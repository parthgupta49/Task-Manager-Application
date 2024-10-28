import React, { useEffect, useRef, useState } from 'react'
import EditSectionSkeleton from '../profile/MyProfileSection'
import { useDispatch, useSelector } from 'react-redux'
import IconBTN from '../../../common/IconBTN';
import toast from 'react-hot-toast';
import { updateProfilePicture } from '../../../../services/operations/profileAPI';

const UpdateProfilePicture = () => {
  // const { token } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [userFileInput, setUserFileInput] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useSelector(store => store.profile);
  const { image } = user;

  const handleChangeButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const handleFileInput = (e) => {
    const inputFile = e.target.files[0];
    const acceptedExtensionFiles = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!acceptedExtensionFiles.includes(inputFile.type)) {
      toast.error("Please upload only jpg,png ")
      return;
    }
    setUserFileInput(inputFile);
  }

  useEffect(() => {
    if (userFileInput) {
      // toast.error("Error uploading profile picture");

        console.log("Input File : ", userFileInput);
        const formData = new FormData();
        formData.append('displayPicture', userFileInput);

      // console.log("FORMDATA " ,formData.entries()); // this will not return the files as a key-value pair instead returns an Iterator.
      // formData.entries() Returns an Iterator:
      // The formData.entries() method returns an iterator, which means it does not return a simple array or object that can be logged directly. Instead, it provides an iterator object that you can loop through, which is why your for...of loop works.


      // Log FormData contents to check whether the file is there or not before making an API call
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      dispatch(updateProfilePicture(formData))
      setUserFileInput(null);
    }
  }, [userFileInput,dispatch])

  return (
    <div>
      <EditSectionSkeleton iconToBeVisible={false}>
        <div className='flex gap-x-6'>
          <img src={image} className=' w-[5rem] aspect-square rounded-full object-cover' />
          <div className='flex flex-col gap-3'>
            <h3>Change Profile Picture</h3>
            <div className='flex gap-x-3'>
              <IconBTN text={"Change"} customClasses={"bg-yellow-50 px-4 py-1 rounded-lg text-black font-medium"} onclick={handleChangeButton} />
              <input ref={fileInputRef} type='file' className='hidden' accept='image/png,image/jpeg,image/jpg' onChange={handleFileInput} />
              <IconBTN text={"Remove"} customClasses={"bg-richblack-600 px-4 py-1 rounded-lg text-richblack-25 font-medium"} />
            </div>
          </div>
        </div>
      </EditSectionSkeleton>
    </div>
  )
}

export default UpdateProfilePicture