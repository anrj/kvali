import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/atomic/Button";
import Input from "../components/atomic/Input";
import supabase from "../utils/supabase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 4rem;
  border-top: 1px dotted #45260a60;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }
`;

const FormContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #140e0e;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$hasError ? "#e8aea8" : "#ccc")};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  background-color: #fdf2e9;
  box-sizing: border-box;
  color: #45260a;
  box-shadow: ${(props) =>
    props.$hasError ? "inset 0 0 0 2px #e8aaa46f" : "none"};

  &:focus {
    border-color: #e57e22;
    outline: none;
    box-shadow: 0 0 0 2px rgba(229, 126, 34, 0.2);
  }

  &::placeholder {
    font-family: "TBCX", sans-serif;
  }

  @media (max-width: 768px) {
    min-height: 120px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    min-height: 100px;
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const ThumbnailContainer = styled.div<{ $hasError?: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 8/5;
  border: 2px dashed ${(props) => (props.$hasError ? "#e8aea8" : "#ccc")};
  border-radius: 8px;
  background-color: #fdf2e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease;
  overflow: hidden;

  &:hover {
    border-color: ${(props) => (props.$hasError ? "#e8aea8" : "#999")};
  }

  &:focus-within {
    border-color: #e57e22;
    outline: none;
    box-shadow: 0 0 0 2px rgba(229, 126, 34, 0.2);
  }
`;

const ThumbnailInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

const ThumbnailPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const ThumbnailPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  color: #666;

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const ThumbnailIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border: 2px solid #f8d9bd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: #f8d9bd;
    border-radius: 1px;
  }

  &::before {
    width: 16px;
    height: 2px;
  }

  &::after {
    width: 2px;
    height: 16px;
  }

  @media (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.375rem;

    &::before {
      width: 12px;
      height: 2px;
    }

    &::after {
      width: 2px;
      height: 12px;
    }
  }
`;

const ThumbnailText = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.2rem;
  }
`;

const ThumbnailSubtext = styled.span`
  font-size: 0.75rem;
  color: #999;

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const Select = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$hasError ? "#e8aea8" : "#ccc")};
  border-radius: 8px;
  font-size: 1rem;
  font-family: "TBCX", sans-serif;
  background-color: #fdf2e9;
  color: #45260a;
  box-shadow: ${(props) =>
    props.$hasError ? "inset 0 0 0 2px #e8aaa46f" : "none"};

  &:focus {
    border-color: #e57e22;
    outline: none;
    box-shadow: 0 0 0 2px rgba(229, 126, 34, 0.2);
  }
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #cc777b;
  padding-left: 0.2rem;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  background-color: #e57e22;
  margin-top: 1rem;

  &:hover {
    background-color: #cf711f;
  }
`;

interface CampaignFormData {
  title: string;
  description: string;
  goalAmount: string;
  thumbnailFile: File | null;
  campaignType: 1 | 2 | 3 | 0; // 1: charity, 2: business, 3: other
  iban: string;
}

interface FieldError {
  error: boolean;
  message: string;
}

interface FormErrors {
  title: FieldError;
  description: FieldError;
  goalAmount: FieldError;
  thumbnailFile: FieldError;
  campaignType: FieldError;
  iban: FieldError;
}

const initialFormErrors: FormErrors = {
  title: { error: false, message: "" },
  description: { error: false, message: "" },
  goalAmount: { error: false, message: "" },
  thumbnailFile: { error: false, message: "" },
  campaignType: { error: false, message: "" },
  iban: { error: false, message: "" },
};

export default function CampaignCreationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    goalAmount: "",
    thumbnailFile: null,
    campaignType: 0,
    iban: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "campaignType") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) as 1 | 2 | 3 | 0,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (formErrors[name as keyof FormErrors]?.error) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: { error: false, message: "" },
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, thumbnailFile: file }));

      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);

      if (formErrors.thumbnailFile.error) {
        setFormErrors((prev) => ({
          ...prev,
          thumbnailFile: { error: false, message: "" },
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, thumbnailFile: null }));
      setThumbnailPreview(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { ...initialFormErrors };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = {
        error: true,
        message: "კამპანიის სათაური აუცილებელია",
      };
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = {
        error: true,
        message: "კამპანიის აღწერა აუცილებელია",
      };
      isValid = false;
    }
    if (!formData.goalAmount.trim()) {
      newErrors.goalAmount = {
        error: true,
        message: "სამიზნე თანხის მითითება აუცილებელია",
      };
      isValid = false;
    } else if (
      isNaN(parseFloat(formData.goalAmount)) ||
      parseFloat(formData.goalAmount) <= 0
    ) {
      newErrors.goalAmount = {
        error: true,
        message: "სამიზნე თანხა უნდა იყოს დადებითი რიცხვი",
      };
      isValid = false;
    }
    if (!formData.thumbnailFile) {
      newErrors.thumbnailFile = {
        error: true,
        message: "კამპანიის ბანერის ატვირთვა აუცილებელია",
      };
      isValid = false;
    }
    if (!formData.campaignType) {
      newErrors.campaignType = {
        error: true,
        message: "კამპანიის ტიპის არჩევა აუცილებელია",
      };
      isValid = false;
    }
    const ibanRegex = /^GE[0-9]{2}[A-Z]{2}[0-9]{16}$/i;
    if (!formData.iban.trim()) {
      newErrors.iban = {
        error: true,
        message: "ბანკის ანგარიშის მითითება აუცილებელია",
      };
      isValid = false;
    } else if (!ibanRegex.test(formData.iban)) {
      newErrors.iban = {
        error: true,
        message: "გთხოვთ, შეიყვანოთ სწორი ქართული ბანკის ანგარიში",
      };
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    if (!user) {
      setSubmitError("თქვენ უნდა იყოთ შესული სისტემაში კამპანიის შესაქმნელად.");
      return;
    }

    setIsLoading(true);

    try {
      const imageId = crypto.randomUUID();
      let thumbnailUrl = null;

      if (formData.thumbnailFile) {
        const fileExt = formData.thumbnailFile.name.split(".").pop();
        const fileName = `${imageId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("campaign-images")
          .upload(`private/${fileName}`, formData.thumbnailFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`სურათის ატვირთვის შეცდომა: ${uploadError.message}`);
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("campaign-images")
          .getPublicUrl(`private/${fileName}`);

        thumbnailUrl = publicUrl;
      }

      const { data: campaign, error: insertError } = await supabase
        .from("campaigns")
        .insert({
          title: formData.title,
          description: formData.description,
          goal_amount: parseFloat(formData.goalAmount),
          type: formData.campaignType,
          IBAN: formData.iban,
          thumbnail_url: thumbnailUrl,
          current_amount: 0,
          organizer_id: user.id,
        })
        .select()
        .single();

      if (insertError) {
        if (thumbnailUrl && formData.thumbnailFile) {
          const fileExt = formData.thumbnailFile.name.split(".").pop();
          const fileName = `${imageId}.${fileExt}`;
          await supabase.storage
            .from("campaign-images")
            .remove([`private/${fileName}`]);
        }
        throw new Error(`კამპანიის შექმნის შეცდომა: ${insertError.message}`);
      }

      if (!campaign) {
        throw new Error("კამპანია არ შეიქმნა.");
      }

      navigate(`/campaign/${campaign.id}`);
    } catch (error) {
      console.error("Campaign creation error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "კამპანიის შექმნისას მოხდა შეცდომა."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit} noValidate>
        <FormTitle>ახალი კამპანიის შექმნა</FormTitle>

        <FormContent>
          <LeftColumn>
            <InputFieldContainer>
              <Label htmlFor="thumbnailFile">კამპანიის ბანერი</Label>
              <ThumbnailContainer $hasError={formErrors.thumbnailFile.error}>
                <ThumbnailInput
                  type="file"
                  id="thumbnailFile"
                  name="thumbnailFile"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {thumbnailPreview ? (
                  <ThumbnailPreview
                    src={thumbnailPreview}
                    alt="სურათის წინასწარი გადახედვა"
                  />
                ) : (
                  <ThumbnailPlaceholder>
                    <ThumbnailIcon />
                    <ThumbnailText>
                      დააჭირეთ სურათის ატვირთვისთვის
                    </ThumbnailText>
                    <ThumbnailSubtext>
                      რეკომენდებული ზომა: 800x500 პიქსელი
                    </ThumbnailSubtext>
                  </ThumbnailPlaceholder>
                )}
              </ThumbnailContainer>
              {formErrors.thumbnailFile.error && (
                <ErrorText>{formErrors.thumbnailFile.message}</ErrorText>
              )}
            </InputFieldContainer>

            <InputFieldContainer>
              <Label htmlFor="description">კამპანიის დეტალური აღწერა</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="მოგვიყევით თქვენი კამპანიის შესახებ დეტალურად. ახსენით რისთვის გჭირდებათ ფული, როგორ გამოიყენებთ თანხას და რატომ უნდა დაგეხმარონ."
                $hasError={formErrors.description.error}
              />
              {formErrors.description.error && (
                <ErrorText>{formErrors.description.message}</ErrorText>
              )}
            </InputFieldContainer>
          </LeftColumn>

          <RightColumn>
            <InputFieldContainer>
              <Label htmlFor="title">კამპანიის სათაური</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="შეიყვანეთ მოკლე და მომხიბვლელი სათაური"
                hasError={formErrors.title.error}
                errorMessage={formErrors.title.message}
              />
            </InputFieldContainer>

            <InputFieldContainer>
              <Label htmlFor="goalAmount">სამიზნე თანხა (ლარი)</Label>
              <Input
                type="number"
                id="goalAmount"
                name="goalAmount"
                value={formData.goalAmount}
                onChange={handleChange}
                placeholder="მაგ., 5000"
                hasError={formErrors.goalAmount.error}
                errorMessage={formErrors.goalAmount.message}
              />
            </InputFieldContainer>

            <InputFieldContainer>
              <Label htmlFor="campaignType">კამპანიის ტიპი</Label>
              <Select
                id="campaignType"
                name="campaignType"
                value={formData.campaignType}
                onChange={handleChange}
                $hasError={formErrors.campaignType.error}
              >
                <option value={0} disabled>
                  აირჩიეთ კამპანიის ტიპი
                </option>
                <option value={1}>
                  საქველმოქმედო (ჯანმრთელობა, განათლება, სოციალური დახმარება)
                </option>
                <option value={2}>ბიზნეს (სტარტაპი, პროდუქტი, სერვისი)</option>
                <option value={3}>
                  სხვა (კრეატიული პროექტები, ხელოვნება, სპორტი)
                </option>
              </Select>
              {formErrors.campaignType.error && (
                <ErrorText>{formErrors.campaignType.message}</ErrorText>
              )}
            </InputFieldContainer>

            <InputFieldContainer>
              <Label htmlFor="iban">ბანკის ანგარიში (IBAN)</Label>
              <Input
                type="text"
                id="iban"
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                placeholder="GE00TB0000000000000000"
                hasError={formErrors.iban.error}
                errorMessage={formErrors.iban.message}
              />
            </InputFieldContainer>
          </RightColumn>
        </FormContent>

        {submitError && (
          <ErrorText
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "0.9rem",
              marginTop: "1rem",
            }}
          >
            {submitError}
          </ErrorText>
        )}

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "იქმნება..." : "კამპანიის შექმნა"}
        </SubmitButton>
      </FormContainer>
    </PageContainer>
  );
}
