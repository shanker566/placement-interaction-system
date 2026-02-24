import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import userService from '../../services/userService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const StudentProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user?.profile) {
            setProfile(user.profile);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle array for skills
        if (name === 'skills') {
            setProfile({ ...profile, [name]: value.split(',').map(s => s.trim()) });
        } else {
            setProfile({ ...profile, [name]: value });
        }
    };

    const handleSave = async () => {
        try {
            await userService.updateProfile({ profile });
            setIsEditing(false);
            alert('Profile updated!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
            </div>

            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="First Name" name="firstName" value={profile.firstName || ''} onChange={handleChange} disabled={!isEditing} />
                    <Input label="Last Name" name="lastName" value={profile.lastName || ''} onChange={handleChange} disabled={!isEditing} />
                    <Input label="Phone" name="phone" value={profile.phone || ''} onChange={handleChange} disabled={!isEditing} />
                    <Input label="Department" name="department" value={profile.department || ''} onChange={handleChange} disabled={!isEditing} />
                    <Input label="CGPA" name="cgpa" type="number" value={profile.cgpa || ''} onChange={handleChange} disabled={!isEditing} />
                    <Input
                        label="Skills (comma separated)"
                        name="skills"
                        value={Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || ''}
                        onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(',').map(s => s.trim()) })}
                        disabled={!isEditing}
                    />
                </div>
            </Card>
        </div>
    );
};

export default StudentProfile;
