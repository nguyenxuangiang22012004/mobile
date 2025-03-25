import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Define valid FontAwesome 5 Free icon names
type IconName =
    | 'box-open'
    | 'id-card'
    | 'map-marker-alt'
    | 'credit-card'
    | 'ticket-alt'
    | 'bell'
    | 'question-circle'
    | 'info-circle'
    | 'store'
    | 'search'
    | 'shopping-cart'
    | 'heart'
    | 'user'
    | 'pencil-alt'
    | 'angle-right'
    | 'sign-out-alt'
    | 'signal'
    | 'wifi'
    | 'battery-full';

// Định nghĩa kiểu cho thông tin cá nhân
interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const ProfileScreen: React.FC = () => {
    const router = useRouter();

    // State để quản lý thông tin cá nhân
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        name: 'Afsar Hossen',
        email: 'lmshuvo97@gmail.com',
        phone: '+123 456 7890',
        address: '123 Main Street, City, Country',
    });

    // State để quản lý chế độ chỉnh sửa
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // State để lưu thông tin tạm thời khi chỉnh sửa
    const [tempInfo, setTempInfo] = useState<PersonalInfo>({ ...personalInfo });

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        router.replace('/login'); // Thay '/' bằng route của màn hình đăng nhập hoặc màn hình chính
    };

    // Hàm xử lý khi nhấn nút "Edit" hoặc "Save"
    const handleEditToggle = () => {
        if (isEditing) {
            // Lưu thông tin khi nhấn "Save"
            setPersonalInfo({ ...tempInfo });
        }
        setIsEditing(!isEditing);
    };

    // Hàm xử lý thay đổi giá trị của các trường thông tin
    const handleInputChange = (field: keyof PersonalInfo, value: string) => {
        setTempInfo((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/64' }}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    {isEditing ? (
                        <TextInput
                            style={styles.profileNameInput}
                            value={tempInfo.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        />
                    ) : (
                        <Text style={styles.profileName}>{personalInfo.name}</Text>
                    )}
                    <Text style={styles.profileEmail}>{personalInfo.email}</Text>
                </View>
            </View>

            {/* Personal Information */}
            <ScrollView style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Email</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.infoInput}
                            value={tempInfo.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                    ) : (
                        <Text style={styles.infoText}>{personalInfo.email}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Phone</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.infoInput}
                            value={tempInfo.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                        />
                    ) : (
                        <Text style={styles.infoText}>{personalInfo.phone}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Address</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.infoInput}
                            value={tempInfo.address}
                            onChangeText={(text) => handleInputChange('address', text)}
                        />
                    ) : (
                        <Text style={styles.infoText}>{personalInfo.address}</Text>
                    )}
                </View>
            </ScrollView>

            {/* Edit/Save Button */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
                <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>

            {/* Log Out Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <FontAwesome5 name="sign-out-alt" size={20} color="green" />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    profileInfo: {
        marginLeft: 16,
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileNameInput: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 4,
    },
    profileEmail: {
        color: 'gray',
        marginTop: 4,
    },
    infoContainer: {
        flex: 1,
        padding: 16,
    },
    infoItem: {
        marginBottom: 20,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 4,
    },
    infoInput: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 4,
        marginTop: 4,
    },
    editButton: {
        backgroundColor: '#10B981',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
        margin: 16,
        borderRadius: 8,
    },
    logoutText: {
        marginLeft: 8,
        color: 'green',
        fontSize: 16,
    },
});

export default ProfileScreen;