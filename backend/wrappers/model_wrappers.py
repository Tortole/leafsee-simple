"""
Module with wrappers for django models
"""


def extend_choices(inherited_choices_class):
    """
    Wrapper for extending one choices class with values from another

    Parameters:
        inherited_choices_class - choices class from which choice values will be inherited
    """

    def wrapper(wrapped_choices_class):
        choices = {}
        for item in inherited_choices_class:
            choices[item.name] = item.value
        for item in wrapped_choices_class:
            choices[item.name] = item.value
        return wrapped_choices_class.__bases__[0](
            wrapped_choices_class.__name__, choices
        )

    return wrapper
