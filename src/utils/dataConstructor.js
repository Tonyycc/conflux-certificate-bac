import metadata from "../data/metadata.json";

const {
  academicDirector,
  courseLink,
  courseName,
  description,
  instructor,
  name,
} = metadata;

export const buildNftMetadata = (data) => {
  const {
    blockchainTimeStamp,
    cid,
    endDate,
    signedBy,
    studentName,
    totalSupply,
    stampingAddress,
  } = data;

  const object = {
    name: `${name} #${String(totalSupply)}`,
    description: description,
    image: `https://gateway.pinata.cloud/ipfs/${cid}`,
    tokenId: totalSupply,
    attributes: [
      {
        trait_type: "Course Name",
        value: courseName,
      },
      {
        trait_type: "Course Link",
        value: courseLink,
      },
      {
        trait_type: "Student Name",
        value: studentName,
      },
      {
        trait_type: "End Date",
        value: endDate,
      },
      {
        trait_type: "Instructor",
        value: instructor,
      },
      {
        trait_type: "Academic Director",
        value: academicDirector,
      },
      {
        trait_type: "Signed By",
        value: signedBy,
      },
      {
        trait_type: "Blockchain StampId",
        value: blockchainTimeStamp,
      },
      {
        trait_type: "Stamping Address",
        value: stampingAddress
      }
    ],
  };
  return object;
};
