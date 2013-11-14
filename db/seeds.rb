guestUser = User.find_by_email('guest@heifernote.com')

if !!guestUser
	guestUser.destroy
end

guestUser = User.create!(email: "guest@heifernote.com", password: "supersecretcows")

##UNCATEGORIZED NOTES#
n2 = Note.new(title: "To do list", content:"-Make resume\r\n-Get hired\r\n-Make money\r\n-Retire")
n2.user_id = guestUser.id
n2.save!

##NOTEBOOKS##
nb1 = Notebook.new(name: "Projects")
nb1.user_id = guestUser.id
nb1.save!

nb2 = Notebook.new(name: "Restaurants")
nb2.user_id = guestUser.id
nb2.save!

##NOTEBOOK NOTES##
n5 = Note.new(title: "Asteroids", content:"DONE:\r\n-astroids generated\r\n-asteroids mantain a certain count\r\n-basic ship/asteroids movement\r\n-ship fires bullets\r\n\r\nTODO:\r\n-handle bullets collision with asteroids\r\n-asteroids should break into smaller asteroids\r\n-randomize asteroids generation/shape by size and canvas X,Y \r\n-add a ship shape\r\n-ship should turn to show orientation\r\n")
n5.user_id = guestUser.id
n5.notebook_id = nb1.id
n5.save!
Tag.create!(name: "alpha", note_id: n5.id)
Tag.create!(name: "hold", note_id: n5.id)

n6 = Note.new(title: "Wheel of Lunch", content:"TODO:\r\n-Use google or yelp API (research)\r\n-Basic functionality\r\n   -returns single restaurant name\r\n   -only filter by distance and open now\r\n   -allow users to blacklist restaurants\r\n-Advanced functionality\r\n   -allow view by pictures mode\r\n   -add a history function to prevent recent repeats\r\n   -allow users to add own restaurants(?)\r\n\r\n")
n6.user_id = guestUser.id
n6.notebook_id = nb1.id
n6.save!
Tag.create!(name: "idea", note_id: n6.id )

n7 = Note.new(title: "HeiferNote", content:"DONE:\r\n-Basic note functionality\r\n-Basic notebook functionality\r\n-Tag creation and deletion\r\n-Search by tags\r\n-Automatic updates of notes\r\n-Drag and drop trashcan\r\n\r\nTO DO:\r\n-More polish on CSS/style and code(max height/scroll for notes/notebooks)\r\n-Community features (?)\r\n   -Allow users to make notes/notebooks public\r\n   -Allow users to friend each other\r\n   -sharing of notes can be with public or with designated friend groups")
n7.user_id = guestUser.id
n7.notebook_id = nb1.id
n7.save!
Tag.create!(name: "alpha", note_id: n7.id)
Tag.create!(name: "ongoing", note_id: n7.id)

n8 = Note.new(title: "Chat Program", content:"DONE: \r\n-Basic chat room functionality\r\n-Basic HTML injection protection\r\n\r\nTODO:\r\n-add username \r\n-admin powers(?)\r\n-security(?)")
n8.user_id = guestUser.id
n8.notebook_id = nb1.id
n8.save!
Tag.create!(name: "alpha", note_id: n8.id)
Tag.create!(name: "hold", note_id: n8.id)

n9 = Note.new(title: "Bermese Kitchen", content:"-Rotti\r\n-Pork Curry\r\n-Tea Leaf salad\r\n-Pork with pickled mango\r\n")
n9.user_id = guestUser.id
n9.notebook_id = nb2.id
n9.save!
Tag.create!(name: "food", note_id: n9.id)

n10 = Note.new(title: "Lers Ros", content:"-Mu Klob (?) Gotta ask Aaron how to pronounce that\r\n-Sticky rice\r\n-Duck curry")
n10.user_id = guestUser.id
n10.notebook_id = nb2.id
n10.save!
Tag.create!(name: "food", note_id: n10.id)

n11 = Note.new(title: "Osha cafe", content:"-Duck noodle soup\r\n")
n11.user_id = guestUser.id
n11.notebook_id = nb2.id
n11.save!
Tag.create!(name: "food", note_id: n11.id)

n12 = Note.new(title: "Find", content:"-good bar with a good stout\r\n-ramen \r\n-steakhouse\r\n")
n12.user_id = guestUser.id
n12.notebook_id = nb2.id
n12.save!
Tag.create!(name: "food", note_id: n12.id)


n1 = Note.new(title: "Introduction To HeiferNote", content:"Hi there!\r\nCouple of things to help get you started:\r\n-Create notes and notebooks using the '+' button you see to the left\r\n-Notes are edited here! All updates are automatic, so you don't have to worry about clicking save\r\n-Notebooks are edited with the gear button on each notebook. Click on a notebook to hide/unhide its notes\r\n-Search is done by tags, titles and content.  Search 'intro' to get back to this note!\r\n-Drag and drop notes to notebooks to assign them\r\n-Drag the notes back to the uncategorized section to unassign them\r\n-Drag and drop notes/notebooks to the hungry cow on the left to delete them!\r\n\r\nHave fun!\r\nP.S. I don't know what to populate this guest account with, so I just filled it up with things that I might use this app for.  Feel free to modify these notes or delete them or, better yet, create an account and make your own unique notes!")	
n1.user_id = guestUser.id
n1.save!
Tag.create!(name: "intro", note_id: n1.id)
