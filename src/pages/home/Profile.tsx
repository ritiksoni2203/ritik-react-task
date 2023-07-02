import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { repoProfile } from '../../redux/github/slice';
import { useParams } from 'react-router-dom';
import { AppDispatch } from "../../redux/store"
import CustomSpinner from '../../components/customSpinner';
export const useAppDispatch: () => AppDispatch = useDispatch

const Profile = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { owner, repo } = params;
    const { profile, loading } = useSelector((store: any) => store.github);

    useEffect(() => {
        dispatch(repoProfile({ owner, repo }))
    }, [])

    return (
        loading ? <CustomSpinner />
            :
            <div className="container mx-auto mt-8">
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="bg-gray-100 py-4 px-6">
                        <h2 className="text-2xl font-semibold">{profile.name}</h2>
                        <p className="text-gray-600">Author: {profile?.owner?.login}</p>
                    </div>
                    <div className="p-6">
                        <p className="mb-4">Language: {profile.language}</p>
                        <p className="mb-4">Stars: {profile.stargazers_count}</p>
                        <p className="mb-4">Forks: {profile.forks_count}</p>
                    </div>
                </div>
            </div>
    )
}

export default Profile