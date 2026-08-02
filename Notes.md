TO-DO
- Change all the friend slug into "sesi2" 




Ongoing terminal 1

Ongoing terminal 2
- Make sure the petals are on all the section except the first page with the "buka undangan"

Done 
- Position center of the screen on Buka Undangan (currently too top)
- falling petals on the photo gallery section
- More petals and petals motion
- Change the verse section with gold border with that part using frame.png.
- Button with background from canva
- Save the date count down functionality 
- Embed google maps 
- footer made with <3 
- change background of gift into the right file 
- Use the font <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"> for the number in count down section 
- Frame with cutted hat of A 
- Change the last section background with the public/assets/footer/section-background.png. Make sure the min height is 100vh and width is auto with object-fit: cover
- change the .verse padding horizontal into 16px 
- Remove .welcome-content { padding: 20vh} and add width: 100% into the .welcome-content
- give the .opening-content width: 100% 
- Add this to the .person-card:     display: flex;
    justify-content: center;
    flex-direction: column;
Also add this to the .person-card img {
    width: 43%;
    height: auto;
    flex: 1;
    justify-self: center;
    display: block;
}
- Make the .couple-content width into 100% 
- Clean up the section couple: the image of groom and brides should be on the center of the screen. Their name should be bold
- Change the background section of the last page with footer/section-background.png. make sure the height is 100vh minimum with object-fit: cover. 
- Change font-size .closing-content > p is font-size 12px. Also change the .closing-credit into bottom: 0; 
- Adjust calling the API: /rest/v1/rsvps?select=id%2Cguest_name%2Cmessage%2Ccreated_at&message=not.is.null&order=created_at.desc&limit=8 this one is always return [], and I don't want to limit into 8, more people messaging is better. The filter from the documentation of supabase looks like this: 
let { data: rsvps, error } = await supabase
  .from('rsvps')
  .select("*")

  // Filters
  .eq('column', 'Equal to')
  .gt('column', 'Greater than')
  .lt('column', 'Less than')
  .gte('column', 'Greater than or equal to')
  .lte('column', 'Less than or equal to')
  .like('column', '%CaseSensitive%')
  .ilike('column', '%CaseInsensitive%')
  .is('column', null)
  .in('column', ['Array', 'Values'])
  .neq('column', 'Not equal to')

  // Arrays
  .contains('array_column', ['array', 'contains'])
  .containedBy('array_column', ['contained', 'by'])

  // Logical operators
  .not('column', 'like', 'Negate filter')
  .or('some_column.eq.Some value, other_column.eq.Other value')
- Show the list of guest who give message under the paper of rsvp (fetch it from supabase please). So it should be showing inside a post is (background is from /assets/rsvp/wish-note.png) that is scrollable for the message. The format inside post it will be: 
Name (Font size 16px, bold, #2d4669)
Message content (Font size 14px, regular, #2d4669, scrollable if the message is too long)
Sort it from the newest to oldest. 
Max post it shown in the section is 2 row, each row has 2 post it (2 columns). 
- There is a copy icon in the gift section, make sure the copy icon is working with the copy to clipboard functionality, there is a tooltip for copy and "copied" when user click the copy icon and the clipboard is finished working. 

- Add petal flower falling down in the rsvp section 
- Change .account-card-container margin horizontal to 0
- Change the .ripped-paper-background > span flex-direction into row, remove the min-height, change the padding into 16px 20px 16px 32px, add width 100%

- Fix the .guest-messages-section no min height, no padding
- There is a ripped-account-paper.png on the /public/assets/gift/ripped-account-paper.png, please use it as the background of the white rectangle that shows the account number. Make sure the account number is in the front and the background is not cutted.
- remove the guest-messages-background img, this should be the background of each card 
- For each message post, create wording From: Guest Name, and the message content. The background of the post is from /assets/rsvp/wish-note.png. The post should be scrollable if the message is too long. Also the From: is using gray color #bbbbbb
- In the gift section, change the blue rectangle with /public/assets/gift/blue-paper.png. Make sure the object-fit is cover and nothing cutted. 
- Remove the border-radius of each .message-post
- Also give the last section with petals
- Also add the petal falling in the gift section
- For the .guest-messages-section give margin-top: 100px; 

- Make the gallery layout into like this. Make sure that each image is not cutted and the object-fit is cover. 

- set min-height .message-post with 173px
- Adjust the gift-panel-content h2 into font-size: 56px; text-align-center;
- Give the p inside gift-panel-content with the font-size 14px
- in the .gift-panel-content, give these
    display: flex;
    flex-direction: column;
    gap: 20px;
- change .gallery-column:first-child into margin-top:50%;
- change .gallery-column:nth-child(2) into margin-top: -10%;
- change .gallery-column:nth-child(3) into margin-top: 15%;
- make the 10th photo is inside the .gallery-column:nth-child(2) 
- give .gallery-flower.right with top:0;


- After it send the message, the post it in the bottom should refetch so the newest data is shown there. 
- Change this class to become like this: 
.closing-section-background {
    z-index: 1;
    object-fit: cover;
    object-position: top;
    width: 293%;
    max-width: none;
    height: 111%;
    position: absolute;
    top: -11%;
    left: 33%;
    transform: translateX(-50%);
- Add inside the .closing-content-wrapper css: 
display: flex;
flex-direction-column;
margin-top: 20%;
align-items: center;
- Adjust this .closing-content-wrapper p { font-size: 14px; }