"use client";


import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { countries } from "@/countries";
import { Class, Parent } from "@/types/types";
import RadioInput from "@/components/FormInputs/RadioInput";
import { generateRegistrationNumber } from "@/lib/generateRegNo";
import { generateRollNumber } from "@/lib/generateRoll";
import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import { getCurrentTime } from "@/lib/timeUtils";
import { createUserLog } from "@/actions/user-logs";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;// eslint-disable-line @typescript-eslint/no-explicit-any
  classes: Class[];
  parents: Parent[];
  nextSeq: number;
};
export type StudentProps = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  parentId: string;
  studentType: string;
  parentName?: string;
  classTitle?: string;
  classId: string;
  streamId: string;
  streamTitle?: string;
  password: string;
  imageUrl: string;
  phone: string;
  state: string;
  BCN: string;
  nationality: string;
  religion: string;
  gender: string;
  dob: string;
  rollNo: string;
  regNo: string;
  admissionDate: string;
  address: string;
  schoolId: string;
  schoolName: string;
};
export default function SingleStudentForm({
  editingId,
  initialData,
  classes,
  parents,
  nextSeq,
}: SingleStudentFormProps) {
  // Parents
  const parentOptions = parents.map((parent) => {
    return {
      label: `${parent.firstName} ${parent.lastName}`,
      value: parent.id,
    };
  });
  const [selectedParent, setSelectedParent] = useState<any>(null);// eslint-disable-line @typescript-eslint/no-explicit-any

  // Class
  const classOptions = classes.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]);// eslint-disable-line @typescript-eslint/no-explicit-any
  const classId = selectedClass.value ?? "";
  const streams = classes.find((item) => item.id === classId)?.streams || [];
  // sections/Streams
  const streamsOptions = streams.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  const [selectedStream, setSelectedStream] = useState<any>(null);// eslint-disable-line @typescript-eslint/no-explicit-any
  // Gender
  const genders = [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    },
  ];
  const [selectedGender, setSelectedGender] = useState<any>(genders[0]);// eslint-disable-line @typescript-eslint/no-explicit-any

  // Nationality
  const initialCountryCode = "ZA";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedNationality, setSelectedNationality] =
    useState<any>(initialCountry);// eslint-disable-line @typescript-eslint/no-explicit-any

  // Religion
  const religions = [
    {
      label: "Roman Catholic",
      value: "Catholic",
    },
    {
      label: "Anglican",
      value: "Anglican",
    },
    {
      label: "Islam",
      value: "Islam",
    },
  ];
  const [selectedReligion, setSelectedReligion] = useState<any>(religions[0]);// eslint-disable-line @typescript-eslint/no-explicit-any
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProps>({
    defaultValues: {
      name: "",
    },
  });
  // const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const studentTypes = [
    {
      label: "Private Student",
      id: "PS",
    },
    {
      label: "Sponsored Student",
      id: "SS",
    },
  ];
  const { school } = useSchoolStore();
  const { user } = useUserSession();
  const { getDeviceInfo } = useDeviceInfo();
  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);
      data.schoolId = school?.id ?? "";
      data.schoolName = school?.name ?? "";
      data.imageUrl = imageUrl;
      data.name = `${data.firstName} ${data.lastName}`;
      data.parentId = selectedParent.value;
      data.parentName = selectedParent.label;
      data.classId = selectedClass.value;
      data.classTitle = selectedClass.label;
      data.streamId = selectedStream.value;
      data.streamTitle = selectedStream.label;
      data.nationality = selectedNationality.label;
      data.religion = selectedReligion.value;
      data.gender = selectedGender.value;
      console.log(data);
      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        const rollNo = generateRollNumber();
        const studentType = data.studentType as "PS" | "SS";
        const regNo = generateRegistrationNumber("BU", studentType, nextSeq);
        data.regNo = regNo;
        data.rollNo = rollNo;

        // const res = await createStudent(data);
        // Create User Log
        const name = user?.name ?? "";
        const deviceInfo = await getDeviceInfo();
        const activity = `User (${name}) Created a new Student (${data.name})`;
        const schoolId = school?.id ?? "";
        const { time } = getCurrentTime();
        const log = {
          name,
          activity,
          time: time,
          ipAddress: deviceInfo.ipAddress,
          device: deviceInfo.device,
          schoolId,
        };
        await createUserLog(log);
        setLoading(false);
        toast.success("Student Successfully Created!");
        reset();
        // setImageUrl("/placeholder.svg");
        // router.push("/dashboard/students");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/students"
        parent=""
        title="Student"
        editingId={editingId}
        loading={loading}
      />
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Student First Name"
                name="firstName"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Student Last Name"
                name="lastName"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Email"
                name="email"
                type="email"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Parent"
                options={parentOptions}
                option={selectedParent}
                setOption={setSelectedParent}
                toolTipText="Add New Parent"
                href="/dashboard/users/parents/new"
              />
              <FormSelectInput
                label="Class"
                options={classOptions}
                option={selectedClass}
                setOption={setSelectedClass}
                toolTipText="Add New Class"
                href="/dashboard/academics/classes"
              />
              <FormSelectInput
                label="Stream/Section"
                options={streamsOptions}
                option={selectedStream}
                setOption={setSelectedStream}
                toolTipText="Add New Stream"
                href="/dashboard/academics/classes"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Phone"
                name="phone"
                type="tel"
              />
              <FormSelectInput
                label="Nationality"
                options={countries}
                option={selectedNationality}
                setOption={setSelectedNationality}
              />
              <PasswordInput
                register={register}
                errors={errors}
                type="password"
                label="Student Password"
                name="password"
                toolTipText="Password will be used by student on the student Portal"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="State/Village"
                name="state"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Birth Certificate No."
                name="BCN"
              />
              <FormSelectInput
                label="Religion"
                options={religions}
                option={selectedReligion}
                setOption={setSelectedReligion}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Gender"
                options={genders}
                option={selectedGender}
                setOption={setSelectedGender}
                isSearchable={false}
              />
              <TextInput
                register={register}
                errors={errors}
                label="Date of Birth"
                name="dob"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Admission Date"
                name="admissionDate"
                type="date"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="">
                <div className="grid  gap-3">
                  {/* <TextInput
                    register={register}
                    errors={errors}
                    label="Registration No."
                    name="regNo"
                  /> */}
                  <RadioInput
                    radioOptions={studentTypes}
                    register={register}
                    label="Student type"
                    name="studentType"
                    errors={errors}
                    defaultValue="PS"
                  />
                </div>
                <div className="grid gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Address"
                    name="address"
                  />
                </div>
              </div>
              <div className="grid">
                <ImageInput
                  title="Student Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="studentProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            
          </div>
        </div> */}
      </div>
      <FormFooter
        href="/students"
        editingId={editingId}
        loading={loading}
        title="Student"
        parent=""
      />
    </form>
  );
}
