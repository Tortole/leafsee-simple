"""
Module with template tags for load files with params
"""

from django import template
from django.utils.safestring import mark_safe
from django.contrib.staticfiles import finders

import xml.etree.ElementTree as ET


register = template.Library()


@register.simple_tag(name="load_svg")
def load_svg(svg_path, **kwargs):
    """
    Passes an SVG from static to HTML

    Parameters:
        svg_path - str - path to SVG file
        kwargs - dict - attributes to be set in the svg tag
    Returns:
        SVG XML to be inlined

    Example usage:
        {% load_svg 'svg/person.svg' class='w-8 h-8 hover:fill-mintcream' %}
    """

    ET.register_namespace("", "http://www.w3.org/2000/svg")
    tree = ET.parse(finders.find(svg_path))
    root = tree.getroot()
    for arg, value in kwargs.items():
        root.set(arg, value)
    svg = ET.tostring(root, encoding="unicode", method="html")
    return mark_safe(svg)
