import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

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
    | 'battery-full'
    | 'envelope'
    | 'phone'
    | 'home'
    | 'birthday-cake'
    | 'venus-mars'
    | 'shopping-bag'
    // | 'star' // Removed as rewardPoints is removed
    | 'wallet';

// Định nghĩa kiểu cho thông tin cá nhân của khách hàng (đã bỏ rewardPoints)
interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    orderCount: number;
    // rewardPoints: number; // Bỏ trường này
    defaultPaymentMethod: string;
}

const ProfileScreen: React.FC = () => {
    const router = useRouter();

    // State để quản lý thông tin cá nhân (đã bỏ rewardPoints)
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: 'Afsar Hossen',
        email: 'lmshuvo97@gmail.com',
        phone: '+123 456 7890',
        address: '123 Main Street, City, Country',
        dateOfBirth: '1997-01-15',
        gender: 'Male',
        orderCount: 12,
        // rewardPoints: 350, // Bỏ trường này
        defaultPaymentMethod: 'Credit Card',
    });

    // State để quản lý chế độ chỉnh sửa
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // State để lưu thông tin tạm thời khi chỉnh sửa (đã bỏ rewardPoints)
    const [tempInfo, setTempInfo] = useState<CustomerInfo>({ ...customerInfo });

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        router.replace('/login');
    };

    // Hàm xử lý khi nhấn nút "Edit" hoặc "Save"
    const handleEditToggle = () => {
        if (isEditing) {
            setCustomerInfo({ ...tempInfo });
        } else {
            // Khi bắt đầu chỉnh sửa, cập nhật tempInfo từ customerInfo
            setTempInfo({ ...customerInfo });
        }
        setIsEditing(!isEditing);
    };

    // Hàm xử lý thay đổi giá trị của các trường thông tin
    const handleInputChange = (field: keyof Omit<CustomerInfo, 'orderCount'>, value: string | number) => {
        // Omit 'orderCount' as it's not editable in this UI
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
                        <Text style={styles.profileName}>{customerInfo.name}</Text>
                    )}
                    <Text style={styles.profileEmail}>{customerInfo.email}</Text>
                </View>
            </View>

            {/* Personal Information */}
            <ScrollView style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <View style={styles.infoRow}>
                        <FontAwesome5 name="envelope" size={20} color="gray" />
                        <Text style={styles.infoLabel}>Email</Text>
                    </View>
                    {isEditing ? (
                        <TextInput
                            style={styles.infoInput}
                            value={tempInfo.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            keyboardType="email-address" // Thêm keyboardType phù hợp
                        />
                    ) : (
                        <Text style={styles.infoText}>{customerInfo.email}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <View style={styles.infoRow}>
                        <FontAwesome5 name="phone" size={20} color="gray" />
                        <Text style={styles.infoLabel}>Phone</Text>
                    </View>
                    {isEditing ? (
                        <TextInput
                            style={styles.infoInput}
                            value={tempInfo.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                            keyboardType="phone-pad" // Thêm keyboardType phù hợp
                        />
                    ) : (
                        <Text style={styles.infoText}>{customerInfo.phone}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <View style={styles.infoRow}>
                        <FontAwesome5 name="home" size={20} color="gray" />
                        <Text style={styles.infoLabel}>Address</Text>
                    </View>
                    {isEditing ? (
                        <TextInput
                            style={styles.infoInput}
                            value={tempInfo.address}
                            onChangeText={(text) => handleInputChange('address', text)}
                        />
                    ) : (
                        <Text style={styles.infoText}>{customerInfo.address}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <View style={styles.infoRow}>
                        <FontAwesome5 name="birthday-cake" size={20} color="gray" />
                        <Text style={styles.infoLabel}>Date of Birth</Text>
                    </View>
                    {isEditing ? (
                        <TextInput
                            style={styles.infoInput}
                            value={tempInfo.dateOfBirth}
                            onChangeText={(text) => handleInputChange('dateOfBirth', text)}
                            placeholder="YYYY-MM-DD"
                        />
                    ) : (
                        <Text style={styles.infoText}>{customerInfo.dateOfBirth}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <View style={styles.infoRow}>
                        <FontAwesome5 name="venus-mars" size={20} color="gray" />
                        <Text style={styles.infoLabel}>Gender</Text>
                    </View>
                    {isEditing ? (
                        <Picker
                            selectedValue={tempInfo.gender}
                            onValueChange={(value) => handleInputChange('gender', value)}
                            style={styles.picker}
                            itemStyle={styles.pickerItem} // Thêm style cho item nếu cần
                        >
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    ) : (
                        <Text style={styles.infoText}>{customerInfo.gender}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <View style={styles.infoRow}>
                        <FontAwesome5 name="shopping-bag" size={20} color="gray" />
                        <Text style={styles.infoLabel}>Order Count</Text>
                    </View>
                    {/* Order Count không cho phép chỉnh sửa */}
                    <Text style={styles.infoText}>{customerInfo.orderCount}</Text>
                </View>

                {/* View hiển thị Reward Points đã được xóa */}

                <View style={styles.infoItem}>
                    <View style={styles.infoRow}>
                        <FontAwesome5 name="wallet" size={20} color="gray" />
                        <Text style={styles.infoLabel}>Default Payment Method</Text>
                    </View>
                    {isEditing ? (
                        <Picker
                            selectedValue={tempInfo.defaultPaymentMethod}
                            onValueChange={(value) => handleInputChange('defaultPaymentMethod', value)}
                            style={styles.picker}
                            itemStyle={styles.pickerItem} // Thêm style cho item nếu cần
                        >
                            <Picker.Item label="Credit Card" value="Credit Card" />
                            <Picker.Item label="Cash" value="Cash" />
                            <Picker.Item label="PayPal" value="PayPal" />
                            <Picker.Item label="Bank Transfer" value="Bank Transfer" />
                        </Picker>
                    ) : (
                        <Text style={styles.infoText}>{customerInfo.defaultPaymentMethod}</Text>
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
        color: '#333', // Thêm màu chữ để dễ nhìn hơn
    },
    profileEmail: {
        color: 'gray',
        marginTop: 4,
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 16, // Chỉ cần padding ngang
        paddingTop: 16, // Thêm padding top
    },
    infoItem: {
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    infoText: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 28, // Căn lề với icon
        paddingVertical: 6, // Thêm padding để cân đối với TextInput
    },
    infoInput: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 4,
        marginLeft: 28, // Căn lề với icon
        color: '#333', // Thêm màu chữ
    },
    picker: {
        // height: 50, // Chiều cao có thể không cần thiết, để tự động điều chỉnh
        // width: '100%', // Chiếm toàn bộ chiều rộng
        marginLeft: 28, // Căn lề với icon
        // Thêm style nếu cần để giống TextInput hơn, ví dụ:
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginRight: -8, // Bù lại phần padding của container nếu cần
    },
    pickerItem: {
        // Style cho các item trong Picker nếu cần (có thể không hoạt động trên mọi platform)
        fontSize: 16,
    },
    editButton: {
        backgroundColor: '#10B981', // Một màu xanh lá cây đẹp hơn
        paddingVertical: 14, // Tăng padding
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 10, // Giảm khoảng cách dưới
        marginTop: 10, // Thêm khoảng cách trên
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
        paddingVertical: 14, // Đồng bộ padding
        backgroundColor: '#f0f0f0', // Màu nền nhạt hơn
        marginHorizontal: 16, // Đồng bộ margin
        marginBottom: 16, // Khoảng cách dưới cùng
        borderRadius: 8,
        borderWidth: 1, // Thêm viền mỏng
        borderColor: '#e0e0e0', // Màu viền
    },
    logoutText: {
        marginLeft: 10, // Tăng khoảng cách
        color: 'green', // Màu đỏ để nhấn mạnh log out
        fontSize: 16,
        fontWeight: 'bold', // Thêm đậm
    },
});

export default ProfileScreen;