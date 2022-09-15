// Display joining the club form on GET.
exports.club_joining_get = (req, res, next) => {
  res.render("club_form", { title: "Joining to the club" });
};

// Handle joining the club form on POST.
exports.club_joining_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Message create POST");
};
