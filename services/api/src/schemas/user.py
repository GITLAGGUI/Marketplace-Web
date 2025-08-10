from pydantic import BaseModel, EmailStr


class ProfileOut(BaseModel):
    display_name: str | None = None
    bio: str | None = None
    avatar_url: str | None = None
    location: str | None = None
    contact_email: EmailStr | None = None

    class Config:
        from_attributes = True


class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str
    verified: bool
    profile: ProfileOut | None = None

    class Config:
        from_attributes = True
