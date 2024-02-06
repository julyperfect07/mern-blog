import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'


const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(0)
  const [imageFileUploadError, setImageFileUploadingError] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [updateUserSuccess, setUpadteUserSuccess] = useState(null)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  // console.log(imageFileUploadingProgress, imageFileUrl)
  const filePickerRef = useRef()
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(e.target.files[0])
      // setImageFileUrl(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const uploadImage = async () => {
    setImageFileUploading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadingProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadingError('Could not upload image')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL)
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false)
        })
      }
    )
  }
  const handleChange = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    if (imageFileUploading) {
      return
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));

      } else {
        dispatch(updateSuccess(data));
        setUpadteUserSuccess("User's profile updated successfully")

      }
    } catch (error) {
      dispatch(updateFailure(error.message));

    }
  };
  console.log(formData)
  return (
    <div className=' max-w-lg mx-auto p-3 w-full'>
      <h1 className=' my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className=' flex flex-col gap-4' >
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && imageFileUploadingProgress < 100 ? (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgressbar
                value={imageFileUploadingProgress || 0}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={5}
                styles={{
                  path: {
                    stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`,
                  },
                }}
              />
            </div>
          ) : null}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 ? 'opacity-60' : ''
              }`}
          />
        </div>
        <TextInput onChange={handleChange} type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
        <TextInput onChange={handleChange} type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
        <TextInput onChange={handleChange} type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline >
          Update
        </Button>
      </form>
      <div className=' flex justify-between mt-5 text-red-500'>
        <span className=' cursor-pointer'>Delete Account</span>
        <span className=' cursor-pointer'>Sign out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className=' mt-5' >
          {updateUserSuccess}
        </Alert>
      )}
    </div>
  )
}

export default DashProfile