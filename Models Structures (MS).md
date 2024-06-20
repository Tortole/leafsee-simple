# Models structures (MS)

The models, their fields, and the requirements for the latter are described here

MS-LU. LeafseeUser:

- Username
  - required - must be specified
  - max length - 140 symbol
  - min length - 1 symbol
  - valid symbols - latin letters in upper and lower case, numbers, following special symbols: \_-
  - unique - there should be a difference from other users' usernames with at least one character
  - immutable - cannot be changed after account creation
- Password
  - required - must be specified
  - max length - 140 symbol
  - min length - 8 symbol
  - valid symbols - latin letters in upper and lower case, numbers, valid symbols for password (Django password in AbstractUser)
- E-mail
  - null - may have null value
  - max length - 140 symbol
  - min length - 1 symbol
  - valid symbols - latin letters in upper and lower case, numbers, valid symbols for e-mail (Django EmailField)
- Nickname (in the absence of is equal to username)
  - null - may have null value
  - max length - 140 symbol
  - min length - 1 symbol
  - valid symbols - latin letters in upper and lower case, numbers, valid following special symbols: @#$%^&_-\_=+_
- First name
  - null - may have null value
  - max length - 140 symbol
  - min length - 1 symbol
  - valid symbols - latin letters in upper and lower case, numbers and space character
- Last name
  - null - may have null value
  - max length - 140 symbol
  - min length - 1 symbol
  - valid symbols - latin letters in upper and lower case, space character
- Channel description
  - null - may have null value
- Last password change date
  - required - must be specified
  - auto determination - value should be set automatically according to rule - set to the current date when changing password
- Avatar
  - null - may have null value
- Subscriptions (FK **LeafseeUser** Many-to-many, through Subscriptions model)
  - null - may have null value
  - when linked object deleting - delete foreign key from array
- Is banned
  - required - must be specified
  - default value - False

<br />

MS-LU-S. Subscriptions:

- Subscriber (FK **LeafseeUser** Many-to-one)
  - required - must be specified
  - when linked object deleting - delete current entity
- Content creator (FK **LeafseeUser** Many-to-one)
  - required - must be specified
  - when linked object deleting - delete current entity
- Subscription date
  - required - must be specified
  - auto determination - value should be set automatically according to rule - set to the current date when user subscribe

note: couple of **Subscriber** and **Content creator** is unique

<br />

MS-R. Rating (enum):
- available value
  - LIKE - "l" - the object is marked "like" by a user
  - DISLIKE - "d" - the object is marked "dislike" by a user

<br />

MS-R-VR. ViewingRating (enum):
- inheritance from **Rating**
- available value
  - value from Rating
  - NONE - "n" - the object isn't marked by a user

<br />

MS-V. Video:

- File
  - required - must be specified
- Duration
  - required - must be specified
  - auto determination - value should be set automatically according to rule - set to actual video file duration when it is uploaded or modified
- Name
  - required - must be specified
  - max length - 250 symbol
  - min length - 1 symbol
  - valid symbols - all symbols in unicode
- Description
  - null - may have null value
  - max length - 5000 symbol
  - valid symbols - all symbols in unicode
- Author (FK **LeafseeUser** Many-to-one)
  - required - must be specified
  - null when delete - may have null value only if foreign key was deleted
  - when linked object deleting - set foreign key to null
- Upload date
  - required - must be specified
  - auto determination - value should be set automatically according to rule - set to the current date when video file is uploaded
- Preview image
  - null - may have null value
- Tags (FK **Tag** Many-to-many, through VideoTag model)
  - null - may have null value
  - when linked object deleting - set foreign key to null
- Auth user views (FK **LeafseeUser** Many-to-many, through VideoAuthUserView model)
  - null - may have null value
  - when linked object deleting - delete foreign key from array

<br />

MS-V-T. VideoTag:
- Video (FK **Video** Many-to-one)
  - required - must be specified
  - when linked object deleting - delete current entity
- Tag (FK **Tag** Many-to-one)
  - required - must be specified
  - when linked object deleting - delete current entity

note: couple of **Video** and **Tag** is unique

<br />

MS-V-VAUV. VideoAuthUserView:

- Video (FK **Video** Many-to-one)
  - required - must be specified
  - when linked object deleting - delete current entity
- User (FK **LeafseeUser** Many-to-one)
  - required - must be specified
  - null when delete - may have null value only if foreign key was deleted
  - when linked object deleting - set foreign key to null
- View date
  - required - must be specified
  - auto determination - value should be set automatically according to rule - set to the current date when video is watched
- Video rating
  - required - must be specified
  - valid values
    - **ViewingRating** values
  - default value - ViewingRating.NONE

note: couple of **Video** and **User** is unique

<br />

MS-C. Comment:

- Text
  - required - must be specified
  - null - may have null value
  - max length - 7500 symbol
  - valid symbols - all symbols in unicode
- Publication date
  - required - must be specified
  - auto determination - value should be set automatically according to rule - set to the current date when comment is published
- Author (FK **LeafseeUser** Many-to-one)
  - required - must be specified
  - null when delete - may have null value only if foreign key was deleted
  - when linked object deleting - set foreign key to null
- Is changed
  - required - must be specified
  - default value - False
- Is delete
  - required - must be specified
  - default value - False
- Commented video (FK **Video** Many-to-one)
  - required - must be specified
  - when linked object deleting - delete self along with foreign key
- Commented comment (FK **Comments** Many-to-one)
  - null - may have null value
  - when linked object deleting - protect foreign key from deleting
- Comment ratings (FK **LeafseeUser** Many-to-many)
  - null - may have null value
  - when linked object deleting - protect foreign key from deleting

<br />

MS-C. CommentRating:

- Comment (FK **Comment** Many-to-one)
  - required - must be specified
  - when linked object deleting - delete current entity
- User (FK **LeafseeUser** Many-to-one)
  - required - must be specified
  - null when delete - may have null value only if foreign key was deleted
  - when linked object deleting - set foreign key to null
- Comment rating
  - required - must be specified
  - valid values
    - **Rating** values

<br />

MS-T. Tag:

- Name
  - required - must be specified
